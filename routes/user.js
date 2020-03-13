const express = require("express");
const {
  check,
  validationResult
} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require('../auth/auth')

const User = require("../src/User");

router.post(
  "/",
  [
    check("name", "Please enter your name.")
    .not()
    .isEmpty(),
    check("email", "Please enter a valid email.").isEmail(),
    check("password", "Please enter a password that's at least 8 characters long.").isLength({
      min: 8
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      password
    } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          msg: "This user already exists. Please login."
        });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString", {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
          res.redirect('/signin')
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("There was an error.");
    }
  }
);


router.post(
  "/signin",
  [
    check("email", "Please enter a valid email.").isEmail(),
    check("password", "Please enter a valid password.").isLength({
      min: 8
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      email,
      password
    } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User does not exist. Either enter your email correctly, or make an account."
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Your password was incorrect. Please try again."
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secret", {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
          res.redirect('/portfolio')
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "There was a server error."
      });
    }
  }
);

router.post("/portfolio", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({
      message: "There was an error in fetching the user."
    });
  }
});

module.exports = router;