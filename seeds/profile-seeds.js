const { Profile } = require("../models");

const profileData = [
  {
    name: "Profile 1",
    description: "Description for Profile 1",
    phone: "1234567890",
    image: "base64_encoded_image_data_for_profile_1",
    user_id: 1,
    location_id: 1,
  },
  {
    name: "Profile 2",
    description: "Description for Profile 2",
    phone: "9876543210",
    image: "base64_encoded_image_data_for_profile_2",
    user_id: 2,
    location_id: 2,
  },
  {
    name: "Profile 3",
    description: "Description for Profile 3",
    phone: "9876543210",
    image: "base64_encoded_image_data_for_profile_2",
    user_id: 3,
    location_id: 2,
  },
  {
    name: "Profile 4",
    description: "Description for Profile 4",
    phone: "9876543210",
    image: "base64_encoded_image_data_for_profile_2",
    user_id: 4,
    location_id: 5,
  },
  {
    name: "Profile 5",
    description: "Description for Profile 5",
    phone: "9876543210",
    image: "base64_encoded_image_data_for_profile_2",
    user_id: 5,
    location_id: 9,
  },
  {
    name: "Profile 6",
    description: "Description for Profile 6",
    phone: "9876543210",
    image: "base64_encoded_image_data_for_profile_2",
    user_id: 6,
    location_id: 8,
  },
];

const seedProfiles = () => Profile.bulkCreate(profileData);

module.exports = seedProfiles;
