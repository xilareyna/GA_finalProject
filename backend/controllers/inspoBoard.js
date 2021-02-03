const express = require("express");
const inspo = express.Router();
const Inspo = require("../models/inspoBoard.js");
const User = require("../models/user.js");
const { findOneAndUpdate } = require("../models/user.js");
// home.get("/", (req, res) => {
//   res.send("index");
// });

//==============
// Create Route
//=============

inspo.post("/", async (req, res) => {
  try {
    const createdInspo = await Inspo.create(req.body.inspo);
    const username = req.body.username;
    const user = await User.findOne({ username });

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { inspo: [...user.inspo, createdInspo._id] },
      { new: true }
    ).populate("inspo");

    //status sets the status code then sends a json respone
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Index Route
//=============

inspo.get("/", async (req, res) => {
  try {
    const foundInspo = await Inspo.find({});
    res.status(200).json(foundInspo);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Delete Route
//=============

inspo.delete("/:id", async (req, res) => {
  try {
    const deletedInspo = await Inspo.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedInspo);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Update Route
//=============

inspo.put("/:id", async (req, res) => {
  try {
    const updatedInspo = await Inspo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedInspo);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = inspo;
