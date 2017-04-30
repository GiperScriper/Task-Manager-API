const { User } = require('../models/user.model');

function authToken(req, res, next) {
  const token = req.headers['x-auth'];
  User.findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch((error) => {
      res.status(401).json(error);
    });
}

module.exports = {
  authToken,
};

