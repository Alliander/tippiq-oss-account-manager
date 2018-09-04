import debugLogger from 'debugnyan';
import express from 'express';
import BPromise from 'bluebird';
// import expressBunyanLogger from 'express-bunyan-logger';

import app from './app';

BPromise.config({
  warnings: true,
  longStackTraces: true,
  cancellation: true,
  monitoring: true,
});
const logger = debugLogger('tippiq:server');
const port = process.env.PORT;

express()
  // .use(expressBunyanLogger({
  //   name: 'tippiq',
  //   component: 'server',
  //   level: logger.level(),
  // }))
  .get('/', (req, res) => res.json({ success: true })) // TODO make this a healthcheck endpoint
  .use(app)
  .use('*', (req, res) => res.status(404).json({ success: false }))
  .listen(port, () => logger.info({ port }));
