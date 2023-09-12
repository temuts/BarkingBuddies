const router = require('express').Router();
const { Profile } = require('../../models');
const fileUpload = require('../../utils/uploadfile');

// POST route for registering profile (name, description, phone, image, user_id)
router.post('/register', fileUpload.fields([ {name: 'profilePicture', maxCount: 1}, {name: 'petPicture', maxCount: 1}]), async (req, res) => {
  try {

    const profileInfo = await Profile.findOne({ where: { user_id: req.session.user_id } });
    console.log(profileInfo);
    if (!profileInfo) {

      // Access the uploaded profile picture and additional picture, if available
      const profilePictureInfo = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
      const petPictureInfo = req.files['petPicture'] ? req.files['petPicture'][0] : null;

      const profilePicture = (profilePictureInfo ? `${profilePictureInfo.destination}/${profilePictureInfo.filename}`: null);
      console.log(profilePicture);
      // Define a function to check if a value is a string representing a file path
      function isFilePath(value) {
        return typeof value === 'string' && value.startsWith('/img/');
      }
      
      const x = isFilePath(req.body.profilePicture) ? req.body.profilePicture: profilePicture;
      console.log(x);
      const profileData = await Profile.create({
        name: req.body.name,
        description: req.body.description,
        phone: req.body.phone,
        image: x,
        user_id: req.session.user_id
      });

      res.status(200).json(profileData);

    }    

  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
//add post for profile table and pets table and availability table
