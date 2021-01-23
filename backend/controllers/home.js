const express = require("express");
const home = express.Router();
const Home = require("../models/home.js");

// home.get("/", (req, res) => {
//   res.send("index");
// });

//==============
// Create Route
//=============

home.post("/", async (req, res) => {
  try {
    const createdHome = await Home.create(req.body);
    //status sets the status code then sends a json respone
    res.status(200).json(createdHome);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Index Route
//=============

home.get("/", async (req, res) => {
  try {
    const foundHome = await Home.find({});
    res.status(200).json(foundHome);
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

module.exports = home;
