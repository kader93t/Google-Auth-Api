const express = require('express');
const passport = require('passport');
const { store } = require('../middlware/session');

const router = express.Router();

// Authentication with google
// GET /auth/google
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

// Google authentication callback
// GET /auth/google/callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    store.collectionP.then((collection) => {
      const sessions = collection.find({
        // eslint-disable-next-line no-useless-escape
        session: { $regex: `\"user\":\"${req.user.id}\"` },
      });
      sessions.forEach((session) => {
        // eslint-disable-next-line no-underscore-dangle
        if (session._id !== req.session.id) {
          // eslint-disable-next-line no-underscore-dangle
          store.destroy(session._id);
        }
      });
    });
    res.redirect('/');
    // res.send({
    //   status: 200,
    //   message: 'LOGIN WITH GOOGLE SUCCESFULL',
    // });
  }
);

router.get('/auth/logout', (req, res) => {
  req.logout();
  res.send({
    status: 200,
    message: 'Logout succesfully ',
  });
});
module.exports = router;
