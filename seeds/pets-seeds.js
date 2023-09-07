const { Pets } = require("../models");

const petsData = [
  {
    name: "Buddy",
    img: "/img/dog1.jpg",
    description: "A friendly and playful dog",
    breed: "Golden Retriever",
    age: 3,
    gender: "Male",
    user_id: 1,
  },
  {
    name: "Whiskers",
    img: "/img/dog2.jpg",
    description: "An adorable and cuddly cat",
    breed: "Siamese",
    age: 2,
    gender: "Female",
    user_id: 2,
  },
];

const seedPets = () => Pets.bulkCreate(petsData);

module.exports = seedPets;
