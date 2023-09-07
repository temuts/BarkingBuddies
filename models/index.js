const User = require('./user');
const Profile = require('./profile');
const Days = require('./days');
const Availability = require('./availability');
const Location = require('./location');


// A signed up user can have one Profile
User.hasOne(Profile, {
    foreignKey: 'user_id'
});

Profile.belongsTo(User, {
    foreignKey: 'user_id'
});

// A signed up user can have one pet profile
User.hasOne(Pets, {
    foreignKey: 'user_id'
})

Pets.belongsTo(User, {
    foreignKey: 'user_id',
});

// Availblity table many-to-many associations. The Availability table is the Junction/Join table that connects day_id and user_id.
Days.belongsToMany(User, { through: 'Avaibility', sourceKey: 'day_id', targetKey: 'user_id' });
User.belongsToMany(Days, { through: 'Avaibility', sourceKey: 'user_id', targetKey: 'day_id' });


module.exports = {
  User,
  Profile,
  Days,
  Availability,
  Location
};