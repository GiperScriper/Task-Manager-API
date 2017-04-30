const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 200,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
},
  {
    timestamps: true,
  });


function hashingPassword(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
}


function toJSON() {
  const user = this;
  const fields = ['_id', 'email', 'updatedAt', 'createdAt'];
  return _.pick(user, fields);
}


function generateAuthToken() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toString(), access }, 'secret').toString();
  user.tokens.push({ access, token });

  return user.save().then(() => { return token; });
}


function findByToken(token) {
  const User = this;
  let decodedToken = '';
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decodedToken._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
}


function findByCredentials(credentials) {
  const User = this;
  return User.findOne({ email: credentials.email })
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(credentials.password, user.password, (err) => {
          if (err) {
            return reject();
          }
          return resolve(user);
        });
      });
    });
}

userSchema.methods.toJSON = toJSON;
userSchema.methods.generateAuthToken = generateAuthToken;
userSchema.statics.findByToken = findByToken;
userSchema.statics.findByCredentials = findByCredentials;
userSchema.pre('save', hashingPassword);

const User = mongoose.model('User', userSchema);

module.exports = { User };
