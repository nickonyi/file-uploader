import { matchedData, validationResult } from "express-validator";
import passport from "../config/passportConfig.js";
import { registerUser } from "../services/authService.js";

export const postSignUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const mappedErrors = {};

      errors.array().forEach((error) => {
        if (!mappedErrors[error.path]) {
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

    req.session.regenerate((err) => {
      if (err) return next(err);

      req.login(user, (err) => {
        if (err) return next(err);

        return res.status(201).json({
          success: true,
          message: "Account created successfully",
          user,
        });
      });
    });
  } catch (err) {
    return next(err);
  }
};

export const postSignIn = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: info?.message || "Invalid username or password",
      });
    }

    req.session.regenerate((err) => {
      if (err) return next(err);

      req.login(user, (err) => {
        if (err) return next(err);

        return res.status(200).json({
          success: true,
          message: "Successful login",
          user: {
            id: user.id,
            email: user.email,
          },
        });
      });
    });
  })(req, res, next);
};

export const postSignOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");

      return res.status(200).json({
        success: true,
        message: "successfully login",
      });
    });
  });
};
