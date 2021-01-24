require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const MONGOURI = process.env.MONGODB_URI;
const homeController = require("./controllers/home.js");
const goalController = require("./controllers/goals.js");
const listController = require("./controllers/toDoList.js");
const recipeController = require("./controllers/recipes.js");
const inspoController = require("./controllers/inspoBoard.js");

//============
//Middleware
//============
app.use(express.json());

//=====================
//Database Disconnection
//=====================
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

//=====================
//Database Connection
//=====================
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  console.log("connected to mongoose");
});

//============
//Controllers
//============
app.use("/home", homeController);
app.use("/goals", goalController);
app.use("/todolist", listController);
app.use("/recipes", recipeController);
app.use("/inspo", inspoController);

//============
//Listen Port
//============
app.listen(PORT, () => {
  console.log(
    "🎉🎊",
    "getting organized with the Ticking Clock on port",
    PORT,
    "🎉🎊"
  );
});
