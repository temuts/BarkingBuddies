const router = require("express").Router();

const { Pets, User, Buddies, Days, Location, Profile } = require("../models");

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
      logged_in: req.session.logged_in
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
  //******** WE ARE HARDCODING THE SESSION ID. (4) ** needs to be fixed */
  try {
    const profileData = await Profile.findByPk(4, {
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
        user_id: 4,
      },
    });

    const buddiesID_Data = await Buddies.findAll({
      attributes: ["to_user_id"],
      where: {
        from_user_id: 4,
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

    const buddies_info = buddiesData.map((buddy) => buddy.get({ plain: true }));

    console.log(profile);
    console.log(pets);
    console.log(buddies_info);

    // !!!!!!  we need to get buddies pets !!!!! 
    res.render("profile", {
      ...profile,
      pets,
      buddies_info,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for user login - if logged in, redirect to the home page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/',);
    return;
  }
  res.render('login');
});

// Route for user logout - on log out, redirect to the home page
router.get('/logout', (req, res) => {
  res.redirect('/');
  return;
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/')
  } else {
    res.render('signup', {
      upload: true
    });
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
