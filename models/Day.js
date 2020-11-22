const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
  slot1: {
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slot"
    },
    time: {
      type: String,
      default: "10:00 - 11:00"
    }
  },
  slot2: {
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slot"
    },
    time: {
      type: String,
      default: "11:00 - 12:00"
    }
  },
  slot3: {
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slot"
    },
    time: {
      type: String,
      default: "12:00 - 13:00"
    }
  },
  slot4: {
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slot"
    },
    time: {
      type: String,
      default: "14:00 - 15:00"
    }
  },
  slot5: {
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slot"
    },
    time: {
      type: String,
      default: "15:00 - 16:00"
    }
  },
  slot6: {
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slot"
    },
    time: {
      type: String,
      default: "16:00 - 17:00"
    }
  }
});

module.exports = Day = mongoose.model("day", DaySchema);
