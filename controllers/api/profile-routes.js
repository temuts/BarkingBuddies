const router = require('express').Router();
const { Profile } = require('../../models');
const fileUpload = require('../../utils/uploadfile');

// POST route for registering profile (name, description, phone, image, user_id)
router.post('/profile', fileUpload("./public/uploads"), async (req, res) => {
  try {

    if (req.file) {
        var registerUrl = `public/uploads${req.file.filename}`;
    }

    const profileData = await Profile.create({
        name: req.body.name,
        description: req.body.description,
        phone: req.body.phone,
        image: registerUrl,
        user_id: req.session.user_id
    });

    res.status(200).json(profileData);

  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      // Check if the error is specifically related to password length validation
      const pwdError = err.errors.find(
        (e) => e.path === 'password' && e.validatorKey === 'len'
      );
      if (pwdError) {
        // If it's a password length validation error, send the error message
        res.status(400).json({ err: pwdError.message });
      } else {
        // Handle other validation errors
        const errorMessages = err.errors.map((e) => e.message);
        console.log(errorMessages);
        res.status(400).json({ errors: errorMessages });
      }
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

module.exports = router;
//add post for profile table and pets table and availability table
