const Pro = require("../models/provider");
const Message = require("../models/message");

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const {
      fname,
      lname,
      email,
      mobile,
      state,
      city,
      pincode,
      profession,
      password,
    } = req.body;
    const userExist = await Pro.findOne({ email });
    if (userExist) {
      return res.json({ msg: "User mail already exist", status: false });
    }
    const data = await Pro.create({
      fname,
      lname,
      email,
      mobile,
      state,
      city,
      pincode,
      profession,
      password,
    });
    return res.json({ msg: "Account created Successfully", status: true });
  } catch (error) {
    return res.json({ msg: "Can't login", status: false });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    let userExist = await Pro.findOne({ email });
    if (userExist) {
      const isMatch = await userExist.matchPassword(password);
      console.log(isMatch);
      if (isMatch) {
        const token = await userExist.generateToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 10000000000),
        });

        return res.json({
          status: true,
          id: userExist._id,
          token: token,
          email: userExist.email,
          fname: userExist.fname,
          lname: userExist.lname,
          city: userExist.city,
          mobile: userExist.mobile,
          pincode: userExist.pincode,
          state: userExist.state,
        });
      } else {
        return res.json({ msg: "Invalid credentials", status: false });
      }
    } else {
      return res.json({ msg: "Invalid credentials", status: false });
    }
  } catch (error) {
    return res.json({ msg: "Can't login", status: false });
  }
};

const signout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    const data = await Pro.findOne({ _id: req.userId });
    await Pro.updateOne(
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

const details = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Message.find({ provider: id }).populate("user");
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
    ).populate("user");
    return res.status(200).send(data);
  } catch (error) {
    res.status(401).send("Error in messageUpdate");
  }
};

const edit = async (req, res) => {
  const { userId, fname, lname, mobile, email } = req.body;
  try {
    const user = await Pro.findById(userId);
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
      const updatedUser = await Pro.findByIdAndUpdate(userId, user, {
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

module.exports = { signin, signup, signout, details, send, edit };
