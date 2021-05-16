const express = require('express');
const router = express.Router();
const passport = require('passport');

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
    res.send({
      status: 200,
      message: 'LOGIN WITH GOOGLE SUCCESFULL',
    });
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
