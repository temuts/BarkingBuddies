const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const profileImage = require("../utils/profileImageGen");

class Profile extends Model {}

Profile.init(
  {
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "location",
        key: "location_id",
      },
    },
    days_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "days",
        key: "day_id",
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newProfileData) => {
        newProfileData.image = await profileImage.generate();
        return newProfileData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "profile",
  }
);

module.exports = Profile;
