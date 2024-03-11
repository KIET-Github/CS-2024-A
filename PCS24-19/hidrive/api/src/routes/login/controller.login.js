// import sendEmail from "../../utils/sendEmail";
import { createToken } from "../../utils/tokenOperations";
import User from "../user/model.user";
import Session from "./model.session";

/* login users */
export const login = async (req, res) => {
  try {
    let user = await User.findOne(req.body, { password: 0 });

    if (user) {
      const token = createToken({
        email: user.email,
        userId: user._id.toString(),
      });

      //save generated token in database
      const loggedinSession = new Session({ token: token });
      await loggedinSession.save();

      res.cookie("token", token, { maxAge: 900000, httpOnly: true });

      // sendEmail(user.email,'loggedin succesfully')

      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "User dose not exists." });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Something went wrong. Please contact support." });
  }
};
