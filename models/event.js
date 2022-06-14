"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      event.belongsTo(models.partner, { foreignKey: "partner_id" });
      event.hasMany(models.date, { foreignKey: "event_id" });
    }
  }
  event.init(
    {
      title: DataTypes.STRING,
      // details: DataTypes.STRING,
      // url: DataTypes.STRING,
      // yearly: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "event",
    }
  );
  return event;
};
