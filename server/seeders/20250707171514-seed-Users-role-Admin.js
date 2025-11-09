'use strict';

const { hashPassword } = require('../helper/bcryptjs');
const fs = require('fs').promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(await fs.readFile('./data/users.json', 'utf8')).map(el => {
      delete el.id
      el.password = hashPassword(el.password)
      el.createdAt = el.updatedAt = new Date()

      return el
    })
    await queryInterface.bulkInsert('Users', data)

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
