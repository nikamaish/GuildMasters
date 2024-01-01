const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/userProfile.js');

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'userProfile route is working'
  });
});

router.post('/userProfile', (req, res) => {
  const { email, password } = req.body;

  console.log(email + " " + password);
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Check if a user with the provided email already exists
  User.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ error: "User with this email already exists." });
      }

      // If the user doesn't exist, proceed to create a new user
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          const user = new User({
            email: email,
            password: hash
          });

          user.save()
            .then(result => {
              res.status(201).json({ new_user: result });
            })
            .catch(error => {
              res.status(500).json({ error: error });
            });
        }
      });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email: email }).exec();

    if (!user) {
      return res.status(401).json({ error: "No user found." });
    }

    // Add a check to ensure the user has signed up
    if (!user.password) {
      return res.status(401).json({ error: "User has not signed up." });
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(401).json({ error: "Wrong Password or username!" });
    }

    // Create a JWT token
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      jwtSecretKey,
      { expiresIn: '1h' } // You can adjust the expiration time
    );

    // Set the token as an HTTP cookie
    res.cookie('token', token, { httpOnly: true });

    return res.status(200).json({ message: "Authentication successful." });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
});


module.exports = router;
