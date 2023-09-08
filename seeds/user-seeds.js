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
  {
    email: "user3@example.com",
    password: "password3",
  },
  {
    email: "user4@example.com",
    password: "password4",
  },
  {
    email: "user5@example.com",
    password: "password5",
  },
  {
    email: "user6@example.com",
    password: "password6",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
