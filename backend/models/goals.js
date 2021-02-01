const { Schema, model } = require("mongoose");

const goalSchema = Schema({
  expectedDate: { type: String, required: false },
  goals: { type: String, required: false },
});

module.exports = model("Goal", goalSchema);
