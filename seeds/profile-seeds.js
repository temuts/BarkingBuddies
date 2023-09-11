const { Profile } = require("../models");

const profileData = [
  {
    name: "John Doe",
    description: "A passionate dog lover with years of experience.",
    phone: "1234567890",
    image: "TBD",
    user_id: 1,
    location_id: 1,
    days_id: 6,
  },
  {
    name: "Jane Smith",
    description: "An adventurer who loves taking dogs on hikes.",
    phone: "9876543210",
    image: "TBD",
    user_id: 2,
    location_id: 2,
    days_id: 2,
  },
  {
    name: "Michael Johnson",
    description: "Experienced in training dogs for agility competitions.",
    phone: "9876543210",
    image: "TBD",
    user_id: 3,
    location_id: 2,
    days_id: 5,
  },
  {
    name: "Emily Brown",
    description: "A professional dog groomer with a gentle touch.",
    phone: "9876543210",
    image: "TBD",
    user_id: 4,
    location_id: 5,
    days_id: 1,
  },
  {
    name: "David Wilson",
    description: "Veterinarian specializing in pet health and wellness.",
    phone: "9876543210",
    image: "TBD",
    user_id: 5,
    location_id: 9,
    days_id: 3,
  },
  {
    name: "Laura Davis",
    description:
      "A dog behaviorist who helps with training and behavior issues.",
    phone: "9876543210",
    image: "TBD",
    user_id: 6,
    location_id: 8,
    days_id: 2,
  },
];

const seedProfiles = () =>
  Profile.bulkCreate(profileData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedProfiles;
