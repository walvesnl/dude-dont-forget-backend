"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class date extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      date.belongsTo(models.event, { foreignKey: "event_id" });
    }
  }
  date.init(
    {
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "date",
    }
  );
  return date;
};
