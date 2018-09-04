import { Router as createRouter } from 'express';
import debugLogger from 'debugnyan';
import BPromise from 'bluebird';
import path from 'path';
import { EmailTemplate } from 'email-templates';


import idUserRepository from './id-user-repository';
import placesPlaceRepository from './places-place-repository';
import hoodUserRepository from './hood-user-repository';

import { roles } from '../auth';
import sendEmail from '../email';

const router = createRouter();
const logger = debugLogger('tippiq:users');

export { router as default };

const serialize = model => model.serialize();

const addPlacesToUser = user => placesPlaceRepository
      .findAllByTippiqId(user.id)
      .then(serialize)
      .then(places => ({ ...user, places }));

const addHoodSubscriptionsToUser = user => hoodUserRepository
      .findAll({ id: user.id })
      .then(serialize)
      .then(hoodSubscriptions => ({ ...user, hoodSubscriptions }));

function findByEmail(req, res) {
  const { email } = req.params;
  logger.debug({ _function: 'findByEmail', email });
  idUserRepository
    .findByEmail(email)
    .then(serialize)
    .then(addPlacesToUser)
    .then(addHoodSubscriptionsToUser)
    .then(user => res.json({ success: true, user }))
    .catch(err => {
      logger.error(err);
      res.status(400).json({ success: false, email });
    });
}

const convertResultsArrayToObject = ([id, places, hood]) => ({ id, places, hood });

const deletedAdminTemplate = new EmailTemplate(path.join(__dirname, 'templates', 'deleted-admin'));
const renderDeletedAdminEmail = ({ from, to }) => data =>
  deletedAdminTemplate
    .render({ ...data, userData: data.user })
    .tap(template => logger.debug({ _function: 'renderDeletedAdminEmail', template }))
    .then(({ subject, text, html }) => ({
      from,
      to,
      subject,
      text,
      html,
    }))
    .tap(email => logger.debug({ _function: 'renderDeletedAdminEmail', email }))
    .then(sendEmail)
    .catch(logger.warn.bind(logger));


function deleteById(req, res) {
  const { id } = req.params;

  logger.debug({ _function: 'deleteById', id });
  BPromise
    .all([
      idUserRepository.findById(id).then(serialize),
      BPromise
        .all([
          idUserRepository.deleteWhere({ id }),
          placesPlaceRepository.deleteByTippiqId(id),
          hoodUserRepository.deleteWhere({ id }),
        ])
        .map(result => result.deleted)
        .then(convertResultsArrayToObject),
    ])
    .then(([user, results]) => ({ user, results }))
    .tap(results => { logger.debug({ results, reqUser: req.user }); })
    .tap(renderDeletedAdminEmail({ from: 'noreply@tippiq.nl', to: req.user.email }))
    .then(({ user: { email }, results }) => res.json({ success: true, id, email, results }))
    .catch(err => {
      logger.error(err);
      res.status(400).json({ success: false, id });
    });
}

router
  .get('/', (req, res) => res.status(404).json({ success: false }))
  .get('/email/:email', roles.is('administrator'), findByEmail)
  .delete('/:id', roles.is('administrator'), deleteById);
