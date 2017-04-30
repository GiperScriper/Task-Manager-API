const jwt = require('jsonwebtoken');
const { User } = require('../../models/user.model');
const { ObjectId } = require('mongoose').Types;

const objectIdForFirstUser = new ObjectId();

const users = [
  {
    _id: objectIdForFirstUser,
    email: 'john@gmail.com',
    password: 'My!Passw0rd',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: objectIdForFirstUser.toString(), access: 'auth' }, 'secret').toString(),
    }],
  },
  { _id: new ObjectId(), email: 'mike@mail.ru', password: '123456' },
  { _id: new ObjectId(), email: 'bob@company.com', password: 'simplePassword' },
];

function populateUsers(done) {
  User.remove({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
}

module.exports = {
  populateUsers,
  users,
};
