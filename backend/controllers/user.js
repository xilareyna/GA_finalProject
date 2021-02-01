const express = require("express");

const user = express.Router();
const User = require("../models/user.js");

const jwt = require("jsonwebtoken");
const SECRET =
  "yesimthebestandnoimnotpositiveimdefiniteiknowthegamelikeimreffinit";

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    try {
      const payload = await jwt.verify(token, SECRET);
      req.user = payload;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json(new Error("no token in header"));
  }
};

module.exports = user;
