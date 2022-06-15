"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("events", [
      {
        title: "Birthday",
        startDate: "2020-01-01",
        interval: "1 year",
        partner_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "First date",
        startDate: "2020-04-20",
        interval: "1 year",
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
