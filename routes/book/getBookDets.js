const express = require("express");
const router = express.Router();
const User = require("../../models/User");

//@route POST book/getBookDets
//@desc  Retrive array of companies
//@access public

router.post("/", async (req, res) => {
  const { slots } = req.body;
  var bookings = [];
  var book;
  k = 0;
  try {
    for (i in slots) {
      if (slots[i].booked) {
        const slot = await Slot.findOne({ _id: slots[i].id });
        if (slot.user) {
          const user = await User.findOne({ _id: slot.user });
          book = {
            name: user.name,
            time: slot.time,
            slot: slot.slot,
            phone: user.phone,
            //date:slot.date,
            email: user.email
          };
          bookings[k] = book;
          k = k + 1;
        }
      }
    }

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error retriving companies");
  }
});

module.exports = router;
