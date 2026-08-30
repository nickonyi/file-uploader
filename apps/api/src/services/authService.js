import {
  createUserInDB,
  getUserByEmailFromDb,
  getUserByIdFromDB,
} from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { hashPassword } from "../utils/hash.js";

export const getUserById = async (id) => {
  const user = await getUserByIdFromDB(id);
  return user;
};

export const validateUser = async (email, password, verifyFn) => {
  if (!email || !password) return null;

  const user = await getUserByEmailFromDb(email);

  if (!user) return null;

  const isValid = verifyFn(password, user.password_hash);

  return isValid ? user : null;
};

export const registerUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Data is required for registeration!");
  }
  try {
    const hashedPassword = hashPassword(password);

    return await createUserInDB({ email, hashedPassword });
  } catch (err) {
    if (err === "23505") {
      throw new AppError(`email ${email} is already taken!`);
    }
    throw err;
  }
};
