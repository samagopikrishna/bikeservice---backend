const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const CBDB = require("../../models/CBDB");
const Slot = require("../../models/Slot");
const Day = require("../../models/Day");
const Admin = require("../../models/Admin");

//@route POST book/getSlots
//@desc  Retrive array of slots
//@access public

router.post("/", async (req, res) => {
  const { id } = req.body;

  try {
    let cbdb = await CBDB.findOne({ cid: id });
    var slots = new Array(18);
    var k = 0;

    var day1 = await Day.findOne({ _id: cbdb.day1 });
    var day2 = await Day.findOne({ _id: cbdb.day2 });
    var day3 = await Day.findOne({ _id: cbdb.day3 });

    var data, slot;

    data = await Slot.findOne({ _id: day1.slot1.slot });

    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot1.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day1.slot2.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot2.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day1.slot3.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot3.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day1.slot4.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot4.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day1.slot5.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot5.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day1.slot6.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot6.time
    };
    slots[k] = slot;
    k = k + 1;

    data = await Slot.findOne({ _id: day2.slot1.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot1.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day2.slot2.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot2.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day2.slot3.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot3.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day2.slot4.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot4.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day2.slot5.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot5.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day2.slot6.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot6.time
    };
    slots[k] = slot;
    k = k + 1;

    data = await Slot.findOne({ _id: day3.slot1.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot1.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day3.slot2.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot2.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day3.slot3.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot3.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day3.slot4.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot4.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day3.slot5.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot5.time
    };
    slots[k] = slot;
    k = k + 1;
    data = await Slot.findOne({ _id: day3.slot6.slot });
    slot = {
      booked: data.booked,
      id: data._id,
      sno: k + 1,
      time: day1.slot6.time
    };
    slots[k] = slot;
    k = k + 1;

    res.json(slots);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error retriving slots");
  }
});

module.exports = router;
