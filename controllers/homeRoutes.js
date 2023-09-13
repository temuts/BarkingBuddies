const router = require("express").Router();

const { Pets, User, Buddies, Days, Location, Profile } = require("../models");
// POST route for login - search username and password to validate
router.post("/login", async (req, res) => {
  try {
    // Check if the user is valid via the email sent.
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ err: "Incorrect email or password, please try again" });
      return;
    }

    // Check if the password is valid
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ err: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
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
              model: Profile,
              include: [
                {
                  model: Days,
                },
                {
                  model: Location,
                },
              ],
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
              include: [
                {
                  model: Days,
                },
                {
                  model: Location,
                },
              ],
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
    // res.json(pet);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  const userIdNum = req.session.user_id;
  // console.log("User ID in session:", userIdNum);
  try {
    const profileData = await Profile.findByPk(userIdNum, {
      include: [
        {
          model: Location,
        },
        {
          model: Days,
        },
      ],
    });

    const petsData = await Pets.findAll({
      where: {
        user_id: userIdNum,
      },
    });

    const buddiesID_Data = await Buddies.findAll({
      attributes: ["to_user_id"],
      where: {
        from_user_id: userIdNum,
      },
    });

    const profile = profileData.get({ plain: true });
    const pets = petsData.map((pet) => pet.get({ plain: true }));
    const buddies_IDs = buddiesID_Data.map((buddy) =>
      buddy.get({ plain: true })
    );

    const buddiesData = await Profile.findAll({
      where: {
        user_id: buddies_IDs[0].to_user_id,
      },
      include: [
        {
          model: Location,
        },
        {
          model: Days,
        },
      ],
    });
    const buddiesPetInfo = await Pets.findAll({
      where: {
        user_id: buddies_IDs[0].to_user_id,
      },
    });
    const buddiesPetValues = buddiesPetInfo.map((pet)=>pet.dataValues);
    // console.log("BUDDIES PET VALUES", buddiesPetValues);
    const buddies_info = buddiesData.map((buddy) => buddy.get({ plain: true }));
    // console.log("BUDDIES INFO", buddies_info);
    const daysData = await Days.findAll({
      raw: true, 
    });
    const selectedDay = profile.days_id ? daysData.find(day => day.day_id === profile.days_id) : null;
    const locationData = profileData.location.dataValues.name;

    res.render("profile", {
      ...profile,
      pets,
      buddies_info,
      buddiesPetValues,
      selectedDay,
      locationData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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
