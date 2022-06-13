"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class fact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      fact.belongsTo(models.partner, { foreignKey: "partner_id" });
    }
  }
  fact.init(
    {
      title: DataTypes.STRING,
      details: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "fact",
    }
  );
  return fact;
};
