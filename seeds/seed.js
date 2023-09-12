const seedPets = require("./pets-seeds");
const seedLocations = require("./location-seeds");
const seedProfiles = require("./profile-seeds");
const seedUsers = require("./user-seeds");
const seedDays = require("./days-seeds");
const seedBuddies = require("./buddies-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedDays();
  console.log("\n----- DAY SEEDED -----\n");

  await seedLocations();
  console.log("\n----- LOCATIONS SEEDED -----\n");

  await seedProfiles();
  console.log("\n----- PROFILES SEEDED -----\n");

  await seedPets();
  console.log("\n----- PETS SEEDED -----\n");

  await seedBuddies();
  console.log("\n----- BUDDIES SEEDED -----\n");

  process.exit(0);
};

seedAll();
