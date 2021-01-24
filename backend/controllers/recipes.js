const express = require("express");
const recipes = express.Router();
const Recipes = require("../models/recipes.js");

// home.get("/", (req, res) => {
//   res.send("index");
// });

//==============
// Create Route
//=============

recipes.post("/", async (req, res) => {
  try {
    const createdRecipes = await Recipes.create(req.body);
    //status sets the status code then sends a json respone
    res.status(200).json(createdRecipes);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Index Route
//=============

recipes.get("/", async (req, res) => {
  try {
    const foundRecipes = await Recipes.find({});
    res.status(200).json(foundRecipes);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Delete Route
//=============

recipes.delete("/:id", async (req, res) => {
  try {
    const deletedRecipes = await Recipes.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedRecipes);
  } catch (error) {
    res.status(400).json(error);
  }
});

//==============
// Update Route
//=============

recipes.put("/:id", async (req, res) => {
  try {
    const updatedRecipes = await Recipes.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedRecipes);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = recipes;
