const { Schema, model } = require("mongoose");

const recipeSchema = Schema({
  title: { type: String, default: false },
  ingredients: { type: String, default: false },
  directions: { type: String, default: false },
  img: { type: String, default: false },
  cookTime: { type: String, default: false },
});

module.exports = model("Recipe", recipeSchema);
