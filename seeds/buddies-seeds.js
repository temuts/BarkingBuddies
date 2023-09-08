const { Buddies } = require("../models");

const buddiesData = [
  {
    from_user_id: 1,
    to_user_id: 2,
  },
];

const seedBuddies = () => Buddies.bulkCreate(buddiesData);

module.exports = seedBuddies;
