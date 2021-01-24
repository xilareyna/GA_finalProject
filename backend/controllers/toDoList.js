const express = require("express");
const list = express.Router();
const List = require("../models/toDoList.js");

// home.get("/", (req, res) => {
//   res.send("index");
// });

//==============
// Create Route
//=============

list.post("/", async (req, res) => {
  try {
    const createdList = await List.create(req.body);
    //status sets the status code then sends a json respone
    res.status(200).json(createdList);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Index Route
//=============

list.get("/", async (req, res) => {
  try {
    const foundList = await List.find({});
    res.status(200).json(foundList);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Delete Route
//=============

list.delete("/:id", async (req, res) => {
  try {
    const deletedList = await List.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedList);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Update Route
//=============

list.put("/:id", async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = list;
