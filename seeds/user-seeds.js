const { User } = require("../models");

const userData = [
  {
    email: "user1@example.com",
    password: "password1",
  },
  {
    email: "user2@example.com",
    password: "password2",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
