const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
const CBDB = require("../../models/CBDB");
const Slot = require("../../models/Slot");
const Day = require("../../models/Day");
const Admin = require("../../models/Admin");
const sendmail = require("../mail/sendmail");

//@route POST book/bookSlots/user
//@desc  book a slot for user
//@access public

router.post("/user", async (req, res) => {
  const { selected, uid } = req.body;

  try {
    for (i in selected) {
      var slot = await Slot.findOne({ _id: selected[i] });

      if (!slot) {
        return res.status(400).json({ errors: [{ msg: "slotid not found" }] });
      }

      await Slot.updateOne({ _id: selected[i] }, { booked: true, user: uid });

      const user = await User.findOne({ _id: uid });

      sendmail(user.email, "Your slot has booked");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error in registration");
  }
});

//@route POST book/bookSlots/admin
//@desc  book a slot for admin
//@access public

router.post("/admin", async (req, res) => {
  const { selected } = req.body;

  try {
    for (i in selected) {
      var slot = await Slot.findOne({ _id: selected[i] });

      if (!slot) {
        return res.status(400).json({ errors: [{ msg: "slotid not found" }] });
      }

      await Slot.updateOne({ _id: selected[i] }, { booked: true });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error in registration");
  }
});

module.exports = router;
