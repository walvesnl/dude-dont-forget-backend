"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("partners", [
      {
        name: "Mauricia",
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Laura",
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("partners", null, {});
  },
};
