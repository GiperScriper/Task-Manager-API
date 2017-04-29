const path = require('path');
const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';

// Global include function for require with absolute path for locals
global.include = function requireAbsolute(file) {
  return require(path.join(__dirname, '/', file));
};

console.log('ENV **************', env);
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/task_manager';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/task_manager_test';
}

module.exports = {
  port: process.env.PORT,
  dbUrl: 'mongodb://localhost:27017/task_manager',
  dbTestUrl: 'mongodb://localhost:27017/task_manager_test',
};
