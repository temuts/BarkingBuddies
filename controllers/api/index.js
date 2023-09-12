const router = require("express").Router();

const buddiesRoutes = require("./buddies-routes");
const userRoutes = require("./user-routes");
const profileRoutes = require("./profile-routes");

router.use("/user", userRoutes);
router.use("/profile", profileRoutes);
router.use("/buddies", buddiesRoutes);

module.exports = router;
