const router = require("express").Router();
const { withAuth, withProfile } = require("../utils/auth");

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
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/pets/:id", withAuth, async (req, res) => {
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

router.get("/profile", withAuth, async (req, res) => {
  const userIdNum = req.session.user_id;
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

    const profile = profileData.get({ plain: true });
    const pets = petsData.map((pet) => pet.get({ plain: true }));

    const buddiesID_Data = await Buddies.findAll({
      attributes: ["to_user_id"],
      where: {
        from_user_id: userIdNum,
      },
    });
    
    const buddies_IDs = buddiesID_Data.map((buddy) =>
      buddy.get({ plain: true })
    );

    let buddies_info = [];
    let buddiesPetValues = [];

    if (buddies_IDs.length > 0) {
      for (const buddyId of buddies_IDs) {
        const buddiesData = await Profile.findAll({
          where: {
            user_id: buddyId.to_user_id,
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
            user_id: buddyId.to_user_id,
          },
        });
        
        buddiesPetValues.push(...buddiesPetInfo.map((pet) => pet.dataValues));
        buddies_info.push(...buddiesData.map((buddy) => buddy.get({ plain: true })));
      }
    }
    
    const daysData = await Days.findAll({
      raw: true,
    });
    const selectedDay = profile.days_id
      ? daysData.find((day) => day.day_id === profile.days_id)
      : null;
    const locationData = profileData.location.dataValues.name;

    res.render("profile", {
      ...profile,
      pets,
      buddies_info,
      buddiesPetValues,
      selectedDay,
      locationData,
      logged_in: req.session.logged_in,
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
    res.redirect("/register");
    return;
  } else {
    res.render("signup", {
      upload: true,
    });
  }
});

router.get("/register", (req, res) => {
  if (req.session.logged_in) {
    res.render("register", {
      logged_in: req.session.logged_in,
      upload: true,
    });
  } else {
    res.redirect("/");
    return;
  }
});

router.get("/registration-complete", async (req, res) => {
  try {
    console.log("about to start the search...");
    const findProfiles = await Profile.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const profiles_arrays = findProfiles.map((profiles) =>
      profiles.get({ plain: true })
    );
    console.log("findProfiles:", findProfiles);
    console.log("profiles_arrays:", profiles_arrays);

    if (profiles_arrays.length > 0) {
      res.json(true);
      return;
    }
    res.json(false);
  } catch (err) {
    console.error("Error in /registration-complete:", err);
    res.status(500).json(err);
  }
});

module.exports = router;
