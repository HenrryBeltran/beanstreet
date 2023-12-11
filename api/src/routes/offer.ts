import { Router } from "express";
import { getMainOffer } from "../controllers/offerController.js";

export const router = Router();

router.route("/main").get(getMainOffer);
