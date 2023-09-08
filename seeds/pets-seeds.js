const { Pets } = require("../models");

const petsData = [
  {
    name: "Buddy",
    img: "dog1.png",
    description:
      "Buddy is a cheerful Golden Retriever with a heartwarming smile that can brighten anyone's day. At 3 years old, he's the perfect playmate for an active family. His friendly nature and boundless energy make him the ideal companion for outdoor adventures.",
    breed: "Golden Retriever",
    age: 3,
    gender: "Male",
    user_id: 1,
  },
  {
    name: "Charlie",
    img: "dog3.png",
    description:
      "Meet Charlie, a loyal and energetic Labrador Retriever who's always ready for a game of fetch. At just 2 years old, he's a bundle of joy and an excellent choice for an active owner seeking a faithful furry friend.",
    breed: "Labrador Retriever",
    age: 2,
    gender: "Male",
    user_id: 2,
  },
  {
    name: "Lucy",
    img: "dog2.png",
    description:
      "Lucy is a 4-year-old Border Collie known for her remarkable intelligence and friendly disposition. Her striking markings and herding instincts make her a standout in any crowd. She's always up for a challenge and loves to learn new tricks.",
    breed: "Border Collie",
    age: 4,
    gender: "Female",
    user_id: 3,
  },
  {
    name: "Molly",
    img: "dog5.png",
    description:
      "Molly, a 5-year-old Cocker Spaniel, is as sweet as can be. Her playful and loving nature makes her an instant favorite among children and adults alike. She's the perfect lap dog for cozy evenings at home.",
    breed: "Cocker Spaniel",
    age: 5,
    gender: "Female",
    user_id: 4,
  },
  {
    name: "Max",
    img: "dog4.png",
    description:
      "Max is a 3-year-old German Shepherd who combines strength and protectiveness with a gentle heart. His loyalty knows no bounds, making him a reliable guardian for those seeking both a loving pet and a sense of security.",
    breed: "Dalmatian",
    age: 3,
    gender: "Male",
    user_id: 5,
  },
  {
    name: "Bailey",
    img: "dog6.png",
    description:
      "Bailey is a 2-year-old Beagle known for her gentle and friendly personality. With her expressive eyes and wagging tail, she's an expert at melting hearts. She's an excellent choice for families looking for a low-maintenance, affectionate companion.",
    breed: "Terrier",
    age: 2,
    gender: "Female",
    user_id: 6,
  },
];

const seedPets = () => Pets.bulkCreate(petsData);

module.exports = seedPets;
