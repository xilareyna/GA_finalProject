const { Schema, model } = require("mongoose");

const homeSchema = Schema({
  date: { type: String, required: false },
  title: { type: String, required: false },
  journalEntry: { type: String, required: false },
});

module.exports = model("Home", homeSchema);
