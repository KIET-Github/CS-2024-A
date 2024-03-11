import jwt from "jsonwebtoken";

/* crete token */
export const createToken = (tokenData) =>
  jwt.sign(tokenData, "secret", { expiresIn: "1h" });

export const verifyToken = (token) => jwt.verify(token, "secret");

export const expireToken = async (req, res, next) => {};
