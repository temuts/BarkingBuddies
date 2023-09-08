const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Buddies extends Model {}

Buddies.init(
  {
    buddies_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    from_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
    },
    to_user_id: {
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
    modelName: "buddies",
  }
);

module.exports = Buddies;
