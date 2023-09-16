'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserFilePermissionMappings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permission_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Permissions',
          key:'id'
        }
      },
      user_id:{
        type :Sequelize.UUID,
        allowNull:false,
        references:{
          model: "Users",
          key : "id"
        }
      },
      file_id:{
        type :Sequelize.UUID,
        allowNull:false,
        references:{
          model: "Files",
          key : "id"
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
    await queryInterface.dropTable('UserFilePermissionMappings');
  }
};