const router = require('express').Router();
const { Days } = require('../../models');

router.get('/', async (req, res) => {
    try {
      // Get all the Days
      const days = await Days.findAll({
        attributes: ['day_id', 'name_of_day'] 
      });

      res.json(days);

    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;