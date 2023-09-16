'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserFileShareMappings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      file_id:{
        allowNull :false ,
        type: Sequelize.UUID,
        references: {
          model: "Files",
          foreignKey: "id"
        }
      },
      owner_id:{
        allowNull  :false,
        type: Sequelize.UUID,
        references: {
          model: "Users",
          foreignKey:"id"
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
    await queryInterface.dropTable('UserFileShareMappings');
  }
};