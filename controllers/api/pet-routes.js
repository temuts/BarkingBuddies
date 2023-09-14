const router = require('express').Router();
const { Pets } = require('../../models');
const fileUpload = require('../../utils/uploadfile');

// POST route for registering pets (name, description, age, breed, gender, image, user_id)
router.post('/register', fileUpload.fields([{name: 'petPicture', maxCount: 1}]), async (req, res) => {
  try {

    const petInfo = await Pets.findOne({ where: { user_id: req.session.user_id } });
    console.log(petInfo);
    if (!petInfo) {

      // Access the uploaded profile picture and additional picture, if available
      const petPictureInfo = req.files['petPicture'] ? req.files['petPicture'][0] : null;
      const petPicture = (petPictureInfo ? `${petPictureInfo.destination}/${petPictureInfo.filename}`: null);
      console.log(petPicture);

      // Define a function to check if a value is a string representing a file path
      function isFilePath(value) {
        return typeof value === 'string' && value.startsWith('/img/');
      }
      
      const pet_path = isFilePath(req.body.petPicture) ? req.body.petPicture: petPicture;

      const petsData = await Pets.create({
        name: req.body.name,
        description: req.body.description,
        age: req.body.age,
        breed: req.body.breed,
        gender: req.body.gender,
        img: pet_path,
        user_id: req.session.user_id
      });

      res.status(200).json(petsData);

    }    

  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
