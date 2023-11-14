const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userProfile.js');

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'userProfile route is working'
  });
});

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        email: email,
        password: hash
      });

      user.save()
        .then(result => {
          res.status(201).json({
            new_user: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    }
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
      return res.status(401).json({ error: "Authentication failed." });
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(401).json({ error: "Wrong Password or username!" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'qovdk',
      { expiresIn: '1h' } // You can adjust the expiration time
    );

    return res.status(200).json({ token: token, message: "Authentication successful." });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
});


module.exports = router;
