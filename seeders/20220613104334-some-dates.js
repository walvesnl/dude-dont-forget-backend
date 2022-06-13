"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("dates", [
      {
        date: "2022-01-25",
        event_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: "2019-09-08",
        event_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("dates", null, {});
  },
};
