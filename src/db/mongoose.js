const mongoose = require('mongoose');

const config = include('config');

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);

module.exports = { mongoose };
