'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(
    "Permissions",[
      {
      permission_type: 'Read',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      permission_type: 'Write',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      permission_type: 'Delete',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
   )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
     await queryInterface.bulkDelete('Permissions', null, {});
  }
};
