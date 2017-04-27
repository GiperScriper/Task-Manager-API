const path = require('path');
// Global include function for require with absolute path for locals
global.include = function requireAbsolute(file) {
  return require(path.join(__dirname, '/', file));
};

module.exports = {
  port: process.env.PORT || 3000,
  dbUrl: 'mongodb://localhost:27017/task_manager',
  dbTestUrl: 'mongodb://localhost:27017/task_manager_test',
};
