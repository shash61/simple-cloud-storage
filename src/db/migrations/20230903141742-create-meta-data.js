'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MetaData', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      description:{
        allowNull: true,
        type: Sequelize.STRING
      },
      content_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      size: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      file_id:{
        type: Sequelize.UUID,
        allowNull: false,
        references:{
          model: "Files",
          key: "id"
        }
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MetaData');
  }
};