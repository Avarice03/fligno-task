const bcrypt = require("bcrypt");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const HttpError = require("../models/httpError");

config();

const secret = process.env.SECRET;

const adminController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({ deletedAt: "", isAdmin: false });
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error retrieving users.");
    }
  },
};

module.exports = adminController;
