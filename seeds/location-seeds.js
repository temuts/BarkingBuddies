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
  {
    name: "East York",
  },
  {
    name: "Midtown Toronto",
  },
  {
    name: "West Toronto",
  },
  {
    name: "East End",
  },
  {
    name: "West End",
  },
];

const seedLocations = () => Location.bulkCreate(locationData);

module.exports = seedLocations;
