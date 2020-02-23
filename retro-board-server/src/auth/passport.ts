import passport from 'passport';
import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as GithubStrategy } from 'passport-github';
import { TWITTER_CONFIG, GOOGLE_CONFIG, GITHUB_CONFIG } from './config';
import { Store } from '../types';
import uuid from 'uuid';
import { User, AccountType } from 'retro-board-common';

export default (store: Store) => {
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => {
    console.log('Serializing user: ', user);
    cb(null, user);
  });
  passport.deserializeUser((obj, cb) => {
    console.log('De-serializing user: ', obj);
    cb(null, obj);
  });

  // The callback that is invoked when an OAuth provider sends back user
  // information. Normally, you would save the user to the database
  // in this callback and it would be customized for each provider
  const callback = (type: AccountType) => async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: Function
  ) => {
    console.log('Access token: ', accessToken, refreshToken);
    console.log('Profile: ', profile);
    const user: User = {
      accountType: type,
      id: uuid.v4(),
      name: profile.displayName,
      photo: profile.photos?.length ? profile.photos[0].value : null,
      username:
        profile.username ||
        (profile.emails.length ? profile.emails[0].value : null),
    };
    // user.accountType = 'github';
    // user.username = profile.username;
    // user.photo = profile.photos[0].value;
    const dbUser = await store.getOrSaveUser(user);
    console.log('Saving done ', dbUser);
    cb(null, dbUser);
  };

  // Adding each OAuth provider's strategy to passport
  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback('twitter')));
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, callback('google')));
  passport.use(new GithubStrategy(GITHUB_CONFIG, callback('github')));
  passport.use(
    new LocalStrategy(
      { passwordField: 'password', usernameField: 'username' },
      async (
        username: string,
        password: string,
        done: (error: any, user?: any, options?: IVerifyOptions) => void
      ) => {
        console.log('Local strategy', username, password);
        const user: User = {
          accountType: 'anonymous',
          id: uuid.v4(),
          name: username,
          photo: null,
          username: username,
        };
        const dbUser = await store.getOrSaveUser(user);
        console.log('Calling done with ', dbUser);
        done(null, dbUser);
      }
    )
  );
};
