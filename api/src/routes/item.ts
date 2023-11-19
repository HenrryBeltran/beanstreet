import { Router } from "express";
import { getAllItems } from "../controllers/itemController";

export const router = Router();

router.route("/").get(getAllItems);
