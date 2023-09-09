const router = require('express').Router();

const userRoutes = require('./user-routes');
const profileRoutes = require('./profile-routes');

router.use('/user', userRoutes);
router.use('/profile', profileRoutes);


module.exports = router;
