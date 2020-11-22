const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const CBDB = require("../../models/CBDB");
const Slot = require("../../models/Slot");
const Day = require("../../models/Day");
const Admin = require("../../models/Admin");

//@route POST api/register/admin
//@desc  register admin
//@access public

router.post(
  "/admin",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "please enter valid password").isLength({ min: 6 }),
    check("cdetails.cname", "Enter valid company name")
      .not()
      .isEmpty(),
    check("cdetails.location.street", "Enter valid street")
      .not()
      .isEmpty(),
    check("cdetails.location.city", "Enter valid street")
      .not()
      .isEmpty(),
    check("cdetails.location.state", "Enter valid state")
      .not()
      .isEmpty(),
    check("cdetails.location.pincode", "Enter valid pincode")
      .isLength({ min: 6, max: 6 })
      .isNumeric(),
    check("phone", "Enter valid phone number")
      .isMobilePhone()
      .isLength({ min: 10, max: 10 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, cdetails, phone } = req.body;

    try {
      let admin = await Admin.findOne({ email });

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "You are already a User" }] });
      }

      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Admin already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      admin = new Admin({
        name,
        email,
        avatar,
        password,
        cdetails,
        phone
      });

      const salt = await bcrypt.genSalt(10);

      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      const payload = {
        user: {
          id: admin.id
        }
      };

      var tslot = [
        "10:00 - 11:00",
        "11:00 - 12:00",
        "12:00 - 11:00",
        "14:00 - 15:00",
        "15:00 - 16:00",
        "16:00 - 17:00"
      ];
      var slot;
      var day;
      var cbdb;
      var dayid = new Array(3);

      for (j = 1; j < 4; j++) {
        var sid = new Array(6);

        for (i = 1; i < 7; i++) {
          slot = new Slot({
            admin: admin.id,
            time: tslot[i - 1],
            slot: i,
            day: `day${j}`
          });

          await slot.save();

          sid[i - 1] = slot.id;
        }

        day = new Day({
          slot1: { slot: sid[0] },
          slot2: { slot: sid[1] },
          slot3: { slot: sid[2] },
          slot4: { slot: sid[3] },
          slot5: { slot: sid[4] },
          slot6: { slot: sid[5] }
        });

        await day.save();

        dayid[j - 1] = day.id;
      }

      cbdb = new CBDB({
        cid: admin.id,
        day1: dayid[0],
        day2: dayid[1],
        day3: dayid[2]
      });

      await cbdb.save();

      await Admin.updateOne({ _id: admin.id }, { cbdb: cbdb.id });

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

//@route POST api/register/user
//@desc  register admin
//@access public

router.post(
  "/user",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("phone", "Enter valid phone number")
      .isMobilePhone()
      .isLength({ min: 10, max: 10 }),
    check("password", "please enter valid password").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password } = req.body;

    try {
      let user = await User.findOne({ email });

      let admin = await Admin.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "You are already a admin" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        phone,
        avatar,
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

//@route POST api/register/getAdmin
//@desc  get admin
//@access public

router.post("/getAdmin", async (req, res) => {
  const { id } = req.body;

  try {
    let admin = await Admin.findOne({ _id: id });

    res.json(admin);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error in registration");
  }
});

module.exports = router;
