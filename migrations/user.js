'use strict';
const { Sequelize, DataTypes, Op } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
        user_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        password : {
            type : DataTypes.STRING,
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
    await queryInterface.dropTable('user');
  }
};