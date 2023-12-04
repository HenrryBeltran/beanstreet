import { Router } from "express";
import { deleteUser, updateUser } from "../controllers/userController.js";

export const router = Router();

router.route("/").patch(updateUser).delete(deleteUser);
