import { matchedData, validationResult } from "express-validator";
import passport from "../config/passportConfig.js";
import { registerUser } from "../services/authService.js";

export const postSignUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const mappedErrors = {};

      errors.array().forEach((error) => {
        if (!mappedErrors(error.path)) {
          mappedErrors[error.path] = error.msg;
        }
      });

      return res.status(400).json({
        success: false,
        errors: mappedErrors,
      });
    }

    const { email, password } = matchedData(req);
    const user = await registerUser({ email, password });
  } catch (err) {
    return next(err);
  }
};
