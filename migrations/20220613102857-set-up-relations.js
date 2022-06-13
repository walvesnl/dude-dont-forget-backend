"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("partners", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("events", "partner_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "partners",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("facts", "partner_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "partners",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("dates", "event_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "events",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("partners", "user_id");
    await queryInterface.removeColumn("events", "partner_id");
    await queryInterface.removeColumn("facts", "partner_id");
    await queryInterface.removeColumn("dates", "event_id");
  },
};
