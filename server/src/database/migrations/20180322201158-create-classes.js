'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER
      },
      semester: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      days: {
        type: Sequelize.STRING
      },
      start: {
        type: Sequelize.TIME
      },
      end: {
        type: Sequelize.TIME
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      building: {
        type: Sequelize.STRING,
        allowNull: true
      },
      room: {
        type: Sequelize.STRING,
        allowNull: true
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('classes');
  }
};