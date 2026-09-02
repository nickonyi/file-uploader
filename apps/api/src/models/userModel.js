import { prisma } from "../lib/prisma.js";

export const getUserByIdFromDB = async (id) => {
  const users = await prisma.$queryRaw`
    SELECT *
    FROM users 
    WHERE id=${id}
    LIMIT 1
    `;
  return users[0] ?? null;
};

export const getUserByEmailFromDb = async (email) => {
  const user = await prisma.$queryRaw`
     SELECT * 
     FROM users
     WHERE email =${email}
     LIMIT 1
    `;

  return user[0] ?? null;
};

export const createUserInDB = async ({ email, hashedPassword }) => {
  const user = await prisma.$queryRaw`
  INSERT INTO users(email,password_hash)
  VALUES (
    ${email},
    ${hashedPassword}
  )
  RETURNING id,email,created_at
  `;

  return user[0] ?? null;
};
