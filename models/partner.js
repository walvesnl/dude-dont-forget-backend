"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class partner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      partner.belongsTo(models.user, { foreignKey: "user_id" });
      partner.hasMany(models.event, { foreignKey: "partner_id" });
      partner.hasMany(models.fact, { foreignKey: "partner_id" });
    }
  }
  partner.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "partner",
    }
  );
  return partner;
};
