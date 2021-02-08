const express = require("express");
const goals = express.Router();
const Goals = require("../models/goals.js");
const User = require("../models/user.js");
const { findOneAndUpdate } = require("../models/user.js");
// home.get("/", (req, res) => {
//   res.send("index");
// });

//==============
// Create Route
//=============

goals.post("/", async (req, res) => {
  try {
    const createdGoals = await Goals.create(req.body.goals);
    const username = req.body.username;
    const user = await User.findOne({ username });

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { goals: [...user.goals, createdGoals._id] },
      { new: true }
    ).populate("goals");

    //status sets the status code then sends a json respone
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Index Route
//=============

goals.get("/", async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username });
    // console.log(user);
    const foundGoals = await Goals.find({});
    res.status(200).json(foundGoals);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// User Route
//=============

goals.get("/v1/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    const fullUser = await user.execPopulate("goals");
    const foundGoals = fullUser.goals;
    res.status(200).json(foundGoals);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Delete Route
//=============

goals.delete("/:id", async (req, res) => {
  try {
    const deletedGoals = await Goals.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedGoals);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Update Route
//=============

goals.put("/:id", async (req, res) => {
  try {
    const updatedGoals = await Goals.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedGoals);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = goals;
