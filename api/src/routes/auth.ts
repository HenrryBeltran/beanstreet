import { Router } from "express";
import { getSession, logout, signIn, signUp } from "../controllers/authController.js";

export const router = Router();

router.route("/sign-in").post(signIn);
router.route("/sign-up").post(signUp);
router.route("/logout").get(logout);
router.route("/session").get(getSession);
