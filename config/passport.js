const { Strategy } = require('passport-google-oauth20');
const mongoose = require('mongoose');
const User = require('../src/db/models/User');
const passport = require('passport');

const config = (passport) => {
  GoogleStrategy = new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        console.log(user);
        if (user) {
          done(null, user);
        } else {
          console.log('lalallal');
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
          });
          await user.save();
          done(null, user);
        }
      } catch (error) {
        done(error, null);
      }
    }
  );
  passport.use(GoogleStrategy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = config;
