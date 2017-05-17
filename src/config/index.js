const path = require('path');
const config = require('./config');

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';

// Global include function for require with absolute path for locals
global.include = function requireAbsolute(file) {
  return require(path.join(__dirname, '/', file));
};


if (env === 'development' || env === 'test') {
  console.log(`*** Running on ${env} environment ***`);
  const envConfig = config[env];
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}

module.exports = {
  API: config.api,
};
