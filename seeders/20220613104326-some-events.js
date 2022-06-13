"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("events", [
      {
        title: "Birthday",
        details: "Mauricia's birthday",
        url: "http://amazon.com",
        partner_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "First date",
        details: "We went to the zoo!",
        url: "https://www.opentable.com/",
        partner_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("events", null, {});
  },
};
