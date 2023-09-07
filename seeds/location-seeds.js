const { Location } = require("../models");

const locationData = [
  {
    name: "Downtown Toronto",
  },
  {
    name: "Scarborough",
  },
  {
    name: "North York",
  },
  {
    name: "Etobicoke",
  },
  {
    name: "York",
  },
];

const seedLocations = () => Location.bulkCreate(locationData);

module.exports = seedLocations;
