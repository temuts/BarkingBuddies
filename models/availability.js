const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Availability extends Model {}

Availability.init(
  {
    availability_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    day_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "days",
        key: "day_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "availability",
  }
);

module.exports = Availability;
