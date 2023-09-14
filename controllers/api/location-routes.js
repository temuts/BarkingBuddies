const router = require('express').Router();
const { Location } = require('../../models');

router.get('/', async (req, res) => {
    try {
      // Get all the locations
      const locations = await Location.findAll({
        attributes: ['location_id', 'name'] 
      });

    //   const locations = locationData.map((location) => location.get({ plain: true }));

      res.json(locations);

    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;