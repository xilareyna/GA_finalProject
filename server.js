const express = require("express");
const app = require("./backend/app");
app.use(express.static("build"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(`${__dirname}/build/index.html`));
// });
