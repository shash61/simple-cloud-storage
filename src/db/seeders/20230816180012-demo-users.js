'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    

     await queryInterface.bulkInsert('Users', [{
       name: 'John Doe',
       isBetaMember: false,
       email: 'johndoe@mail.com',
       password: '1234567899',
       storagePath: '/egwvv/13r1t'
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
    
     await queryInterface.bulkDelete('Users', null, {});
    
  }
};
