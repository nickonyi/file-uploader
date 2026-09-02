import { Router } from "express";
import {
  signUpValidator,
  loginValidator,
} from "../middlewares/validators/authValidators.js";
import {
  postSignIn,
  postSignOut,
  postSignUp,
} from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", signUpValidator, postSignUp);
router.post("/signin", loginValidator, postSignIn);
router.post("/signout", postSignOut);

export default router;
