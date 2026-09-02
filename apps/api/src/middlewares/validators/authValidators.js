import { body } from "express-validator";

export const signUpValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters"),
];

export const loginValidator = [
  body("email").trim().notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
