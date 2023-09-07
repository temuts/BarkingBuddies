const { Days } = require("../models");

const daysData = [
  {
    name_of_day: "Sunday",
  },
  {
    name_of_day: "Monday",
  },
  {
    name_of_day: "Tuesday",
  },
  {
    name_of_day: "Wednesday",
  },
  {
    name_of_day: "Thursday",
  },
  {
    name_of_day: "Friday",
  },
  {
    name_of_day: "Saturday",
  },
];

const seedDays = () => Days.bulkCreate(daysData);

module.exports = seedDays;
