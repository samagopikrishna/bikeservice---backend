const mongoose = require("mongoose");

const CBDBSchema = new mongoose.Schema({
  cid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin"
  },
  day1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "day"
  },
  day2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "day"
  },
  day3: { type: mongoose.Schema.Types.ObjectId, ref: "day" }
});

module.exports = CBDB = mongoose.model("cbdb", CBDBSchema);
