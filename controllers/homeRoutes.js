const router = require("express").Router();
const {
  Pets,
  Availability,
  User,
  Buddies,
  Days,
  Location,
  Profile,
} = require("../models");

router.get("/", async (req, res) => {
  try {
    const petsData = await Pets.findAll({
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

    const browse_pets = petsData.map((pets) => pets.get({ plain: true }));
    console.log(browse_pets);

    res.render("homepage", {
      browse_pets,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
