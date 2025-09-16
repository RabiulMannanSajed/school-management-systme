import config from "../../config/index.js";
import { User } from "../user/user.model.js";
import jwt from "jsonwebtoken";

export const LoginUser = async ({ userId, password }) => {
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error("User not found");
  }

  // TODO: Add password check here with bcrypt.compare()

  const payload = {
    userId: user.userId,
    role: user.role,
  };

  const token = jwt.sign(payload, config.jwt_access_secret, {
    expiresIn: config.jwt_access_expires,
  });

  return { token, user: payload }; // ✅ only return, no res here
};
