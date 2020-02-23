import express from 'express';
import passport, { Strategy } from 'passport';
import { github, google, twitter } from './controller';

const router = express.Router();
// Setting up the passport middleware for each of the OAuth providers
const twitterAuth = passport.authenticate('twitter');
const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});
const facebookAuth = passport.authenticate('facebook');
const githubAuth = passport.authenticate('github');
const anonAuth = passport.authenticate('local');

// Routes that are triggered by the callbacks from each OAuth provider once
// the user has authenticated successfully
router.get('/twitter/callback', twitterAuth, twitter);
router.get('/google/callback', googleAuth, google);
router.get('/github/callback', githubAuth, github);
router.post(
  '/anonymous/login',
  (req, res, next) => {
    console.log('body: ', req.body);
    next();
  },
  anonAuth,
  (req, res, next) => {
    console.log('anon login', req.body);
    // res.end();
    res.send(req.user);
  }
);

// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right
// socket
router.use((req, res, next) => {
  console.log('Writing socket id', req.session?.socketId);
  req.session!.socketId = req.query.socketId;
  next();
});

// Routes that are triggered on the client
router.get('/twitter', twitterAuth);
router.get('/google', googleAuth);
router.get('/facebook', facebookAuth);
router.get('/github', githubAuth);

export default router;
