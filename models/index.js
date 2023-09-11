const User = require("./user");
const Profile = require("./profile");
const Days = require("./days");
const Pets = require("./Pets");
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

// Location relation
Profile.hasOne(Location, {
  foreignKey: "location_id",
});

Location.belongsTo(Profile, {
  foreignKey: "location_id",
});

// Days relation
Profile.hasOne(Days, {
  foreignKey: "day_id",
});

Days.belongsTo(Profile, {
  foreignKey: "day_id",
});

// Buddies table many-to-many associations.
User.belongsToMany(User, {
  through: {
    model: Buddies,
    unique: false,
  },
  as: "requester_users",
});

User.belongsToMany(User, {
  through: {
    model: Buddies,
    unique: false,
  },
  as: "reciever_users",
});

module.exports = {
  User,
  Profile,
  Days,
  Location,
  Pets,
  Buddies,
};
