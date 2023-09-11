const router = require('express').Router();
const { Profile } = require('../../models');

// POST route for profile - add username and password
router.post('/profile', async (req, res) => {
    try {
      const profileData = await Profile.create({
        name: req.body.name,
        phone: req.body.phone,
        user_id: req.session.user_id,
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;
//add post for profile table and pets table and availability table
