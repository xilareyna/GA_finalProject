const { Schema, model } = require("mongoose");

const homeSchema = Schema({
  date: { type: Date, required: false },
  title: { type: String, default: false },
  journal: { type: String, default: false },
});

module.exports = model("Home", homeSchema);
