const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");

//@route POST book/getComp
//@desc  Retrive array of companies
//@access public

router.get("/", async (req, res) => {
  try {
    var comps = await Admin.find({}).select(
      "-password -avatar -profile -date -__v"
    );

    res.json(comps);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error retriving companies");
  }
});

module.exports = router;
