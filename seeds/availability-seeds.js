const { Availability } = require("../models");

const avData = [
  {
    day_id: 1,
    user_id: 1,
  },
  {
    day_id: 2,
    user_id: 2,
  },
];

const seedAvailability = () => Availability.bulkCreate(avData);

module.exports = seedAvailability;
