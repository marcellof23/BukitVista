const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  API_KEY: process.env.API_KEY,
  PORT: process.env.PORT,
  NODE_ENV : process.env.NODE_ENV,
  SEQUELIZE_DB : process.SEQUELIZE_DB,
  SEQUELIZE_USERNAME : process.SEQUELIZE_USERNAME,
  SEQUELIZE_PASSWORD : process.SEQUELIZE_PASSWORD,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};