const router = require("express").Router();

const dayRoutes = require("./day-routes");
const locationRoutes = require("./location-routes");
const buddiesRoutes = require("./buddies-routes");
const userRoutes = require("./user-routes");
const profileRoutes = require("./profile-routes");
const petRoutes = require("./pet-routes");

router.use("/user", userRoutes);
router.use("/profile", profileRoutes);
router.use("/pet", petRoutes);
router.use("/buddies", buddiesRoutes);
router.use("/locations", locationRoutes);
router.use("/days", dayRoutes);

module.exports = router;
