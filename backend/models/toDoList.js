const { Schema, model } = require("mongoose");

const listSchema = Schema({
  list: { type: String, default: false },
});

module.exports = model("List", listSchema);
