const User = require("./user");
const Profile = require("./profile");
const Days = require("./days");
const Pets = require("./Pets");
const Availability = require("./availability");
const Location = require("./location");
const Buddies = require("./buddies");

// A signed up user can have one Profile
User.hasOne(Profile, {
  foreignKey: "user_id",
});

Profile.belongsTo(User, {
  foreignKey: "user_id",
});

// A signed up user can have one pet profile
User.hasOne(Pets, {
  foreignKey: "user_id",
});

Pets.belongsTo(User, {
  foreignKey: "user_id",
});

// Availblity table many-to-many associations. The Availability table is the Junction/Join table that connects day_id and user_id.
Days.belongsToMany(User, {
  through: "availability",
  sourceKey: "day_id",
  targetKey: "user_id",
});
User.belongsToMany(Days, {
  through: "availability",
  sourceKey: "user_id",
  targetKey: "day_id",
});

// Buddies table many-to-many associations.
User.belongsToMany(User, {
  through: {
    model: Buddies,
    unique: false,
  },
  as: "to_user",
});

User.belongsToMany(User, {
  through: {
    model: Buddies,
    unique: false,
  },
  as: "from_user",
});

module.exports = {
  User,
  Profile,
  Days,
  Availability,
  Location,
  Pets,
  Buddies,
};
