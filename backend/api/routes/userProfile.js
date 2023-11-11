const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userProfile.js');

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'userProfile route is working'
  });
});

router.post('/', (req, res) => {
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


router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'userProfile route is working'
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  User.findOne({ email: email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: "Authentication failed." });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({ error: "Authentication failed." });
        }

        if (result) {
          return res.status(200).json({ message: "Authentication successful." });
        } else {
          return res.status(401).json({ error: "Authentication failed." });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
