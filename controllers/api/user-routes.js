const router = require('express').Router();
const { User } = require('../../models');

// POST route for signup - add username and password
router.post('/signup', async (req, res) => {
  try {

    const { email, password, confirm_password } = req.body;

    // Check if the user is valid via the email sent.
    const checkuserData = await User.findOne({ 
      where: { email: req.body.email } 
    });

    if (checkuserData) {
      res.status(400).json({ err: 'Email already exists. Please sign up with a different email address.' });
      return;
    }

    // Check if all the fields are used for signup
    if (!email || !password || !confirm_password) {
      return res.status(400).json({ errors: ['Email, password, and confirm_password are required'] });
    }
    
    // Check for the password length
    if (password.length < 8) {
      return res.status(400).json({ err: 'Password needs to be at least 8 characters' });
    }

    // Check if the password and confirm_password fields match
    if (password !== confirm_password) {
      return res.status(400).json({ err: 'Passwords do not match' });
    }
    
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });

  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      // Check if the error is specifically related to password length validation
      const pwdError = err.errors.find(
        (e) => e.path === 'password' && e.validatorKey === 'len'
      );
      if (pwdError) {
        // If it's a password length validation error, send the error message
        res.status(400).json({ err: pwdError.message });
      } else {
        // Handle other validation errors
        const errorMessages = err.errors.map((e) => e.message);
        console.log(errorMessages);
        res.status(400).json({ errors: errorMessages });
      }
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// POST route for login - search username and password to validate
router.post('/login', async (req, res) => {
  try {
    // Check if the user is valid via the email sent.
    const userData = await User.findOne({ 
      where: { email: req.body.email } 
    });

    if (!userData) {
      res.status(400).json({ err: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the password is valid
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ err: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route for logging out the user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
