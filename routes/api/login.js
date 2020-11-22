const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Admin = require("../../models/Admin");
const { check, validationResult } = require("express-validator/check");
const config = require("config");
const jwt = require("jsonwebtoken");

//@route GET api/login
//@desc  Test route
//@access public

//For checking
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const admin = await Admin.findById(req.user.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.json(admin);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/login
//@desc  Authentication and login
//@access public

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        user = await Admin.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials1" }] });
        }
      }

      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //res.send("registration done");
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error in registration");
    }
  }
);

module.exports = router;
