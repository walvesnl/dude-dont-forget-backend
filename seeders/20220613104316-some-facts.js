"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("facts", [
      {
        title: "Color of her eyes",
        details: "Not sure",
        partner_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Allergies",
        details: "Roses, absinth",
        partner_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Favorite cocktail",
        details: "Pornstar Martini",
        partner_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("facts", null, {});
  },
};
