const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  cbdb: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cbdb"
  },
  profile: {
    type: String,
    default: "admin"
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  cdetails: {
    cname: {
      type: String,
      required: true
    },
    location: {
      street: {
        type: String,
        required: true
      },
      area: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      pincode: {
        type: Number,
        required: true
      }
    }
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Admin = mongoose.model("admin", AdminSchema);
