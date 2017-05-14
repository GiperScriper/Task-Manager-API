const path = require('path');
const config = require('./config');

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';

// Global include function for require with absolute path for locals
global.include = function requireAbsolute(file) {
  return require(path.join(__dirname, '/', file));
};


if (env === 'development' || env === 'test') {
  console.log(`*** Running on ${env} environment ***`);
  const envCnfig = config[env];
  Object.keys(envCnfig).forEach((key) => {
    process.env[key] = envCnfig[key];
  });
}

module.exports = {
  API: config.api,
};
