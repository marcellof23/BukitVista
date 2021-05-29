'use strict';
const { Sequelize, DataTypes, Op } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favorite_movies', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        user_id : {
            type : DataTypes.INTEGER,
            allowNull : false
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favorite_movies');
  }
};