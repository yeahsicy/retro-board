import { IStrategyOption } from 'passport-twitter';
import { IOAuth2StrategyOption } from 'passport-google-oauth';
import { StrategyOptions } from 'passport-github';

const providers = ['twitter', 'google', 'github'];

const callbacks = providers.map(provider => {
  return process.env.BASE_URL
    ? `${process.env.BASE_URL}/api/${provider}/callback`
    : `http://localhost:3000/api/${provider}/callback`;
});

const [twitterURL, googleURL, githubURL] = callbacks;

export const CLIENT_ORIGIN = process.env.BASE_URL
  ? process.env.BASE_URL
  : 'http://localhost:3000';

export const TWITTER_CONFIG: IStrategyOption = {
  consumerKey: process.env.TWITTER_KEY || '',
  consumerSecret: process.env.TWITTER_SECRET || '',
  callbackURL: twitterURL,
};

export const GOOGLE_CONFIG: IOAuth2StrategyOption = {
  clientID: process.env.GOOGLE_KEY || '',
  clientSecret: process.env.GOOGLE_SECRET || '',
  callbackURL: googleURL,
};

export const GITHUB_CONFIG: StrategyOptions = {
  clientID: process.env.GITHUB_KEY || '',
  clientSecret: process.env.GITHUB_SECRET || '',
  callbackURL: githubURL,
};
