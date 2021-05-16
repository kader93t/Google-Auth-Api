const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.send('Authenticated'); //next();
  }
  res.send({
    message: 'Not Authenticated',
  });
};

const isGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(400).send({
      message: 'Authenticated',
    });
  }
  res.send({
    message: 'Authenticated',
  });
};

module.exports = {
  isAuthenticated,
  isGuest,
};
