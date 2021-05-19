const Router = require('express')();

const { isAuthenticated } = require('../middlware/auth');

Router.get('/', isAuthenticated, (req, res) => {
  res.send();
});
Router.get('*', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Not Found',
  });
});

module.exports = Router;
