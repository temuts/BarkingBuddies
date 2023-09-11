const router = require("express").Router();
const { Pets } = require("../models");

router.get("/:id", async (req, res) => {
  try {
    const petData = await Pets.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "email"],
          },
          include: [
            {
              model: Days,
              through: Availability,
            },
          ],
        },
      ],
    });

    const pet = petData.get({ plain: true });
    console.log(pet);

    res.render("meetup", {
      ...pet,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;