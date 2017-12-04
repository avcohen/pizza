/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as InstagramStrategy } from 'passport-instagram';
import config from './config';

const CLIENT_ID = '1111bb5a77294a23a29004041da66810';
const CLIENT_SECRET = 'd0fb67154fbb48e1bed8b9adf92edfa5';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
    new InstagramStrategy({
        clientID : CLIENT_ID,
        clientSecret : CLIENT_SECRET,
        callbackURL : 'http://localhost:3000/login/instagram/return'
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(accessToken)
        return done(null, profile)
     }
    )
);

export default passport;
