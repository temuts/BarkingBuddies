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
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/pets/:id", async (req, res) => {
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
              model: Profile,
            },
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
      logged_in: req.session.logged_in,
      ...pet,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", (req, res) => {

  //
  res.render("profile");
});

// Route for user login - if logged in, redirect to the home page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Route for user logout - on log out, redirect to the home page
router.get("/logout", (req, res) => {
  res.redirect("/");
  return;
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  } else {
    res.render("signup");
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
