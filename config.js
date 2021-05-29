const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  API_KEY: process.env.API_KEY,
  PORT: process.env.PORT,
  NODE_ENV : process.env.NODE_ENV,
  DB_HOST : process.SEQUELIZE_HOST,
  DB_NAME : process.SEQUELIZE_DB,
  DB_USER : process.SEQUELIZE_USERNAME,
  DB_PASS : process.SEQUELIZE_PASSWORD,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};