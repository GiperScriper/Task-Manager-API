const { User } = require('../models/user.model');

async function authToken(req, res, next) {
  const token = req.headers['x-auth'];
  try {
    const user = await User.findByToken(token);
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
}

module.exports = {
  authToken,
};

