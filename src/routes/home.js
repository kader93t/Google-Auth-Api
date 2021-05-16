const Router = require('express')();

const { isAuthenticated } = require('./../middlware/auth');

Router.get('/', isAuthenticated, (req, res) => {
  res.send();
});

module.exports = Router;
