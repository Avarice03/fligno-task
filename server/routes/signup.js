const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const HttpError = require("../models/httpError");
const User = require("../models/userModel");

// POST v1/api/signup (User Signup)
router.post("/", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const userExists = await User.find({ userName: user.userName });
    if (userExists.length) {
      return next(new HttpError("Sorry, username is already taken", 400));
    }
    const salt = await bcrypt.genSalt(3);
    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;
    user.deletedAt = "";
    user.isAdmin = false;
    user.favoriteRecipes = [];
    await user.save();
    res.send(`User created`);
  } catch (error) {
    console.log(error);
    res.status(400).send("All fields are required");
  }
});

module.exports = router;
