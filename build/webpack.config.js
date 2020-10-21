require('ts-node').register({
    esModuleInterop: true,
    project: require('path').join(__dirname, 'tsconfig.json'),
    transpileOnly: true,
  });
  module.exports = require('./webpack.config.ts');