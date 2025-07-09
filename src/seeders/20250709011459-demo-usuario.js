'use strict';
const bcrypt = require('bcryptjs');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = bcrypt.hashSync('12345678');

    await queryInterface.bulkInsert('usuarios', [{
      nombre: 'Bryam',
      apellido: 'Castaneda Cuervo',
      email: 'bryamccuervo2004@gmail.com',
      password: passwordHash,
    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
