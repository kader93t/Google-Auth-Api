const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.send({
      status: 200,
      message: 'Authenticated',
    });
    // next();
  }
  return res.status(401).send({
    status: 401,
    message: 'Not Authenticated',
  });
};

const isGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(400).send({
      status: 200,
      message: 'Authenticated',
    });
  }
  return res.status(401).send({
    status: 401,
    message: 'Authenticated',
  });
};

module.exports = {
  isAuthenticated,
  isGuest,
};
