'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('folders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      parent_folder_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references:{
          model:'folders',
          key: 'id'
        },
      },
      owner_id: {
        type: Sequelize.UUID,
        allowNull:false,
        references:{
          model:"Users",
          key :"id"
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
    await queryInterface.dropTable('folders');
  }
};