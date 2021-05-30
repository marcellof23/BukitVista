const pino = require('pino');
const { NODE_ENV } = require('./config');

const logger = pino({
level: NODE_ENV === 'production' ? 'info' : 'debug',
});

module.exports.logger = logger;