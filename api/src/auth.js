import passport from 'passport';
import LocalStrategy from 'passport-local';
import BPromise from 'bluebird';
import bcrypt from 'bcrypt-nodejs';
import debugLogger from 'debugnyan';
import ensureLogin from 'connect-ensure-login';
import ExtendableError from 'es6-error';
import { Router as expressRouter } from 'express';
import ConnectRoles from 'connect-roles';
import { get, pick, partialRight } from 'lodash';

import idUserRepository from './users/id-user-repository';

const logger = debugLogger('tippiq:auth');

export const ensureLoggedIn = ensureLogin.ensureLoggedIn('/api/auth/login');

export class AuthenticationError extends ExtendableError {}
export class NotFoundError extends ExtendableError {}

export const roles = new ConnectRoles({
  failureHandler: (req, res, action) => {
    logger.warn({ _function: 'failureHandler', user: req.user, action, success: false });
    res
      .status(403)
      .json({ success: false, message: 'Forbidden' });
  },
});

const getRoles = req => get(req, 'user.roles', []);
roles.use('administrator', req => getRoles(req).includes('administrator'));

/**
 * Use bcrypt to compare the given clear text password against the hash
 * @param {string} password Clear text
 * @param {string} hash Salted hash from storage
 * @returns {undefined} it throws an AuthenticationError when the password does not match
 */
function verifyPassword(password, hash) {
  logger.trace({ _function: 'verifyPassword', password, hash });
  if (!bcrypt.compareSync(password, hash)) {
    throw new AuthenticationError('Invalid credentials.');
  }
}

export const log = (req, res, next) => {
  const { user } = req;
  const isAuthenticated = req.isAuthenticated;
  const authenticated = req.isAuthenticated();
  logger.debug({ _function: 'log', user, authenticated, isAuthenticated });
  next();
};

export const performAuthentication = (req, res, next) => {
  logger.debug({ _function: 'performAuthentication', passport, reqUser: req.user });
  passport.authenticate('local', (err, user) => {
    logger.debug({ _function: 'performAuthentication', user });
    if (!user) {
      next();
    } else {
      req.logIn(user, next);
    }
  })(req, res, next);
};

const authFindUserOptions = { withRelated: ['userRoles'] };
const convertUserModelToObject = user => BPromise
  .resolve(user.serialize())
  .then(({ userRoles, ...rest }) => ({ ...rest, roles: userRoles.map(role => role.role) }));

export const strategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (username, password, done) => {
  logger.debug({ _function: 'strategy', username });
  idUserRepository
    .findByEmail(username, authFindUserOptions)
    .then(convertUserModelToObject)
    .tap(user => verifyPassword(password, user.passwordHash))
    .tap(user => logger.debug({ _strategy: 'local', username, success: true, user }))
    .tapCatch(({ message: error }) => logger.debug({ _strategy: 'local', username, success: false, error }))
    .asCallback(done);
});

export const serializeUser = (user, done) => {
  BPromise
    .try(() => user.id)
    .tap(id => logger.debug({ _function: 'serializeUser', id }))
    .asCallback(done);
};

export const deserializeUser = (id, done) => {
  logger.debug({ _function: 'deserializeUser', id });
  idUserRepository
    .findById(id, authFindUserOptions)
    .then(convertUserModelToObject)
    .tap(user => logger.debug({ _function: 'deserializeUser', user }))
    .asCallback(done);
};

export const login = (req, res, next) => {
  logger.debug({ _function: 'login', passport });
  passport.authenticate('local', (err, userObject) => {
    BPromise
      .resolve(userObject)
      .tap(() => { if (err) throw err; })
      .tap(user => { if (typeof user === 'undefined') throw new NotFoundError(); })
      .then(partialRight(pick, ['email', 'id', 'roles']))
      .tap(user => logger.debug({ _function: 'login', user }))
      .tap(user => BPromise.fromCallback(done => req.logIn(user, done)))
      .tap(user => logger.debug({ _function: 'login', success: true, user }))
      .then(user => res.json({ success: true, user }))
      .catch(e => {
        logger.debug({ _function: 'login', success: false, user: userObject }, e);
        res.status(400).json({ success: false });
      });
  })(req, res, next);
};

const profile = (req, res) => {
  logger.debug({ _function: 'profile' });
  BPromise
    .resolve(req.user)
    .tap(user => { if (typeof user === 'undefined') throw new NotFoundError(); })
    .then(partialRight(pick, ['email', 'id', 'roles']))
    .tap(user => logger.debug({ _function: 'profile', success: true, user }))
    .then(user => res.json({ success: true, user }))
    .catch(e => {
      logger.debug({ _function: 'profile', success: false }, e);
      res.status(200).json({ success: false });
    });
};

const logout = (req, res) => {
  const { user } = req;
  logger.debug({ _function: 'logout', user });
  if (user) {
    logger.debug({ _function: 'logout', success: true, user: user.id });
    req.session = null;
  } else {
    logger.debug({ _function: 'logout', success: false });
  }
  res.json({ success: true });
};

export const router = expressRouter()
  .post('/login', login)
  .get('/profile', profile)
  .post('/logout', logout);
