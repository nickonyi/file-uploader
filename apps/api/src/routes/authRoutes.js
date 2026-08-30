import { Router } from "express";
import { signUpValidator } from "../middlewares/validators/authValidators.js";
import { postSignUp } from "../controllers/authControllers.js";

const router = Router();

router.post("/signup", signUpValidator, postSignUp);

export default router;
