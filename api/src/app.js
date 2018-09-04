import express from 'express';
import bodyParser from 'body-parser';
import session from 'cookie-session';
import passport from 'passport';

import './config';
import {
  ensureLoggedIn,
  performAuthentication,
  serializeUser,
  deserializeUser,
  strategy,
  roles,
  log,
} from './auth';

import api from './api';

const app = express();

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(strategy);

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(session({
    name: 'session',
    secret: process.env.SESSION_SECRET,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(performAuthentication)
  .use(passport.authenticate('session'))
  .use(roles.middleware())
  .use(log)
  .use('/api', api)
  .get('/hello',
    ensureLoggedIn,
    (req, res) => { res.json({ message: 'Hello' }); })
  .get('/', (req, res) => res.json({ success: true }));

export default app;
