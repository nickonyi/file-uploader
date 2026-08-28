import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
  if (!password) {
    throw error("Password is required!");
  }

  return bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) return false;

  return bcrypt.compare(password, hashedPassword);
};
