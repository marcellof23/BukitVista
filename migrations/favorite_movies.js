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
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('favorite_movies');
  }
};