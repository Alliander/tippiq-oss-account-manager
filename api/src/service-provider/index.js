import { Router as createRouter } from 'express';
import debugLogger from 'debugnyan';

import placesServiceProviderRepository from './places-service-provider-repository';
import { roles } from '../auth';

const router = createRouter();
const logger = debugLogger('tippiq:service-provider');

export { router as default };

function findById(req, res) {
  const { id } = req.params;
  logger.debug({ _function: 'findById', id });
  placesServiceProviderRepository
    .findById(id)
    .then(model => model.serialize())
    .then(serviceProvider => res.json({ success: true, id, serviceProvider }))
    .catch(err => {
      logger.error(err);
      res.status(400).json({ success: false, id });
    });
}

router
  .get('/:id', roles.isAuthenticated(), findById);
