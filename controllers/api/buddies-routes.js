const router = require("express").Router();
const { Buddies } = require("../../models");

// endpoint api/buddies
router.post("/", async (req, res) => {
  try {
    // Sample of req.body
    // {
    //   from_user_id: 1,
    //   to_user_id: 2,
    // }
    const newBuddieConnection = await Buddies.create({ 
      ...req.body,
      from_user_id: req.session.user_id
     });
    res.status(200).json(newBuddieConnection);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
