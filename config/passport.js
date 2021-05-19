const User = require('../src/db/models/User');
const googleStrategy = require('./strategies/GoogleStrategie');

const config = (passport) => {
  passport.use(googleStrategy());

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
