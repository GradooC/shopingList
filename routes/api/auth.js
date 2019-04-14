const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth');

// User Model
const User = require("../../models/User");

// @route POST api/auth
// @desc Auth user
// @access Public
router.get("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "User Does not exist" });
    }

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, config.get("jwtSecret"), {
        expiresIn: 3600
      });

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    });
  });
});

// @route GET api/auth/user
// @desc Get user Data
// @access Privat
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router;
