import { createToken } from "../../utils/tokenOperations";
import User from "./model.user";

/* get logged in user data */
export const getUser = (req, res) => {
  res.status(200).json(req.user)
};

/* update logged in user data */
export const updateUser=(req,res)=>{}

/* delete logged in user data */
export const deleteUser=(req,res)=>{}

