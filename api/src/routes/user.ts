import { Router } from "express";
import { deleteUser, updateUser } from "../controllers/userController";

export const router = Router();

router.route("/").patch(updateUser).delete(deleteUser);
