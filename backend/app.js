require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const MONGOURI = process.env.MONGODB_URI;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/user");

const SECRET =
  "yesimthebestandnoimnotpositiveimdefiniteiknowthegamelikeimreffinit";

const homeController = require("./controllers/home.js");
const goalController = require("./controllers/goals.js");
const listController = require("./controllers/toDoList.js");
const recipeController = require("./controllers/recipes.js");
const inspoController = require("./controllers/inspoBoard.js");
const userController = require("./controllers/user.js");

//============
//Middleware
//============
app.use(express.json());
app.use(cors());

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
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose");
});

//============
//Controllers
//============
//"/api/home"
app.use("/api/home", homeController);
app.use("/api/goals", goalController);
app.use("/api/todolist", listController);
app.use("/api/recipes", recipeController);
app.use("/api/inspo", inspoController);

app.post("/api/register", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(createdUser);
    }
  });
});
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (bcrypt.compareSync(password, user.password)) {
      // if the passwords are correct
      // make a token
      // send that token to the user
      // so that we can store it in our localstorage
      // this way the user will be able to stay logged in
      const token = jwt.sign(
        {
          username: user.username,
        },
        SECRET
      );
      res.status(200).json({
        token,
        username,
        authenticated: true,
      });
    } else {
      res.status(500);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

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

module.exports = app;
