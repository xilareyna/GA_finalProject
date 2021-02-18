const express = require("express");
const home = express.Router();
const Home = require("../models/home.js");
const User = require("../models/user.js");
const { findOneAndUpdate } = require("../models/user.js");
// home.get("/", (req, res) => {
//   res.send("index");
// });

//==============
// Create Route
//=============

home.post("/", async (req, res) => {
  try {
    const createdHome = await Home.create(req.body.home);
    const username = req.body.username;
    const user = await User.findOne({ username });

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { home: [...user.home, createdHome._id] },
      { new: true }
    ).populate("home");
    //status sets the status code then sends a json respone
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Index Route
//=============

home.get("/", async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username });
    const foundHomes = await Home.find({});
    res.status(200).json(foundHomes);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// User Route
//=============

home.get("/v1/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    const fullUser = await user.execPopulate("home");
    const foundHomes = fullUser.home;
    res.status(200).json(foundHomes);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Delete Route
//=============

home.delete("/:id", async (req, res) => {
  try {
    const deletedHome = await Home.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedHome);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Update Route
//=============

home.put("/:id", async (req, res) => {
  try {
    const updatedHome = await Home.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedHome);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Edit Route
//=============

home.get("/journal/:id/edit", (req, res) => {
  Home.findById(req.params.id, (err, foundHome) => {
    //find the fruit
    res.render("EditJournal.js", {
      home: foundHome,
    });
  });
});

home.put("/journal/:id", (req, res) => {
  Home.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      res.redirect("/journal");
    }
  );
});

module.exports = home;
