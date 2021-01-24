const { Schema, model } = require("mongoose");

const goalSchema = Schema({
  expectedDate: { type: Date, required: false },
  goals: { type: String, default: false },
});

module.exports = model("Goal", goalSchema);
