const { Strategy } = require('passport-google-oauth20');
const User = require('../../src/db/models/User');

const strategy = () =>
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
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

module.exports = strategy;
