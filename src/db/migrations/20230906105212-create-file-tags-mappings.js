'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FileTagsMappings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      file_id:{
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model: "files",
          key: "id"
        }
      },
      tag_id:{
        allowNull: false,
        type: Sequelize.UUID,
        references:{
          model: "tags",
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
    await queryInterface.dropTable('FileTagsMappings');
  }
};