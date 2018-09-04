import { Router as expressRouter } from 'express';

import usersRouter from './users';
import { router as authRouter } from './auth';
import serviceProviderRouter from './service-provider';

export default expressRouter()
  .get('/', (req, res) => res.json({ success: true }))
  .use('/users', usersRouter)
  .use('/auth', authRouter)
  .use('/service-provider', serviceProviderRouter);
