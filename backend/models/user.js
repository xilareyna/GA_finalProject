const { Schema, model } = require("mongoose");

const userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  goals: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
  inspo: [{ type: Schema.Types.ObjectId, ref: "Inspo" }],
  recipe: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  list: [{ type: Schema.Types.ObjectId, ref: "List" }],
  journal: [{ type: Schema.Types.ObjectId, ref: "Home" }],
});

module.exports = model("User", userSchema);
