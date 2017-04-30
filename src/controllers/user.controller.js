const { User } = require('../models/user.model');
const _ = require('lodash');

function createUser(req, res) {
  const data = _.pick(req.body, ['email', 'password']);
  const user = new User(data);
  user.save(user)
    .then(() => {
      return user.generateAuthToken();
      // res.status(201).json(response);
    })
    .then(() => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}

function getCurrentUser(req, res) {
  res.status(200).json(req.user);
}

module.exports = {
  createUser,
  getCurrentUser,
};
