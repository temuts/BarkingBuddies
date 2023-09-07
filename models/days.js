const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Days extends Model {}

Days.init(
  {
    day_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name_of_day: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'days',
  }
);