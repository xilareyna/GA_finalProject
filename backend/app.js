require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const homeController = require("./controllers/home.js");
const mongoose = require("mongoose");
const MONGOURI = process.env.MONGODB_URI;

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
