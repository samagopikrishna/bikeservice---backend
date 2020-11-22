const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true
  },
  booked: {
    type: Boolean,
    default: false
  },
  desc: {
    type: String
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },
  slot: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  }
});

module.exports = Slot = mongoose.model("slot", SlotSchema);
