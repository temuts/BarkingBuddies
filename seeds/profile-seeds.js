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
];

const seedProfiles = () => Profile.bulkCreate(profileData);

module.exports = seedProfiles;
