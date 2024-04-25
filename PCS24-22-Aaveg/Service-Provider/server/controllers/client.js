const User = require("../models/user");
const Pro = require("../models/provider");
const Message = require("../models/message");
const mongoose = require("mongoose");

const signup = async (req, res) => {
  try {
    const { fname, lname, email, mobile, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ msg: "User mail already exist", status: false });
    }
    const data = await User.create({ fname, lname, email, mobile, password });
    return res.json({ status: true, msg: "Account created successfully" });
  } catch (error) {
    return res.json({ status: false, msg: " Couldn't create account" });
  }
};

const signin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      const isMatch = await userExist.matchPassword(password);
      if (isMatch) {
        const token = await userExist.generateToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 1000000000000),
        });
        res.json({
          status: true,
          token: token,
          id: userExist._id,
          name: userExist.fname,
        });
      } else {
        return res.json({ status: false, msg: "Invalid Credentials" });
      }
    } else {
      return res.json({ status: false, msg: "Invalid Credentials" });
    }
  } catch (error) {
    return res.json({ status: false, msg: " Couldn't create account" });
  }
};

const signout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    const data = await User.findOne({ _id: req.userId });
    await User.updateOne(
      { _id: req.userId },
      {
        tokens: [],
      }
    );
    return res.status(200).json({ messege: "successfully log out" });
  } catch (err) {
    return res.status(400).send({ error: "Credentials does not Match" });
  }
};

const service = async (req, res) => {
  try {
    const city = req.query.city;
    const pincode = req.query.pincode;
    const work = req.query.work;

    let data = await Pro.find({
      profession: { $regex: new RegExp(work, "i") },
      $or: [
        { pincode: { $regex: new RegExp(pincode, "i") } },
        { city: { $regex: new RegExp(city, "i") } },
      ],
    });
    if (data.length == 0) {
      data = await Pro.find({ fname: "Jon" });
      data[0].profession = work;
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(401).send("Failed to Search");
  }
};

const create = async (req, res) => {
  try {
    const { user, provider } = req.body;
    const userExist = await Message.findOne({
      $and: [{ user: user }, { provider: provider }],
    }).populate("provider");
    if (userExist) {
      return res.status(200).send(userExist);
    }
    const data = await Message.create({ user, provider });
    return res.status(200).send(data);
  } catch (error) {
    res.status(401).send("Error in create");
  }
};

const details = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Message.find({ user: id }).populate("provider");
    return res.status(200).send({
      user: req.rootUser,
      message: data,
    });
  } catch (error) {
    res.status(401).send("Error in messageUpdate");
  }
};

const send = async (req, res) => {
  try {
    const { chatId, sender, content } = req.body;
    const data = await Message.findOneAndUpdate(
      { _id: chatId },
      { $push: { message: { sender, content } } },
      { new: true }
    ).populate("provider");
    return res.status(200).send(data);
  } catch (error) {
    res.status(401).send("Error in messageUpdate");
  }
};

const edituser = async (req, res) => {
  const { userId, fname, lname, mobile, email } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ status: false, msg: "User not found." });
    }
    if (fname) {
      user.fname = fname;
    }
    if (lname) {
      user.lname = lname;
    }
    if (mobile) {
      user.mobile = mobile;
    }
    if (email) {
      user.email = email;
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, user, {
        new: true,
      });
      return res.json({
        status: true,
        msg: "User updated successfully.",
        data: updatedUser,
      });
    } catch (e) {
      return res.json({ status: false, msg: "can't update " });
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    return res.json({ status: false, msg: " Server error " });
  }
};

module.exports = {
  signin,
  signup,
  signout,
  service,
  create,
  details,
  send,
  edituser,
};
