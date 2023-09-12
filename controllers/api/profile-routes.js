const router = require('express').Router();
const { Profile, Pets } = require('../../models');

// POST route for profile and pet registration
router.post('/register-pet', async (req, res) => {
  try {
    // Create a profile record
    const profileData = await Profile.create({
      name: req.body.name,
      phone: req.body.phone,
      image: req.body.image,
      location_id: req.body.location_id,
      days_id: req.body.days_id,
      user_id: req.session.user_id,
    });

    // Create a pet record
    const petData = await Pets.create({
      name: req.body.petName,
      description: req.body.description,
      breed: req.body.breed,
      age: req.body.age,
      img: req.body.img,
      gender: req.body.gender,
      user_id: req.session.user_id,
    });

    if (profileData && petData) {
      res.status(201).json({ message: 'Profile and pet data stored successfully' });
    } else {
      res.status(500).json({ message: 'Failed to store profile and pet data' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
//add post for profile table and pets table and availability table
