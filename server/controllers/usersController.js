const bcrypt = require("bcrypt");
const { config } = require("dotenv");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/httpError");
const User = require("../models/userModel");

config();
const secret = process.env.SECRET;

const userController = {
  getSingleUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, secret);
      const user = await User.findById({ _id: payload._id });
      if (!user) {
        return next(new HttpError("User does not exist", 404));
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error retrieving user.");
    }
  },
  updateSingleUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, secret);
      const salt = await bcrypt.genSalt(3);
      const userExists = await User.find({
        _id: { $ne: payload._id },
        userName: req.body.userName,
      });
      if (userExists.length) {
        return next(new HttpError("Sorry, username is already taken", 400));
      }
      const user = await User.findOneAndUpdate(
        {
          _id: payload._id,
        },
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          password: await bcrypt.hash(req.body.password, salt),
        }
      );
      if (!user) {
        return next(new HttpError("User does not exist", 404));
      }
      res.send(`User ${user.userName} updated`);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error updating user.");
    }
  },
  deleteSingleUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, secret);
      const dateDeleted = new Date();
      const user = await User.findById({ _id: payload._id, deletedAt: "" });
      if (!user) {
        return next(new HttpError("User does not exist", 404));
      }
      const userToDelete = await User.findOneAndUpdate(
        { _id: payload._id },
        { deletedAt: dateDeleted }
      );
      if (!userToDelete) {
        return next(new HttpError("User does not exist", 404));
      }
      res.send(`${userToDelete.userName} user deleted.`);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error deleting user.");
    }
  },
};

module.exports = userController;
