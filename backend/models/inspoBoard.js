const { Schema, model } = require("mongoose");

const inspoSchema = Schema({
  img: { type: String, default: false },
  title: { type: String, default: false },
});

module.exports = model("Inspo", inspoSchema);
