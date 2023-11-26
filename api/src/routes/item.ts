import { Router } from "express";
import {
  getAllItems,
  getDrinkBySlug,
  getItemsBySection,
  getPastrieBySlug,
  getSandwichBySlug,
  getSelectedDrinks,
  getSelectedFood,
} from "../controllers/itemController";

export const router = Router();

router.get("/", getAllItems);
router.get("/section/:slug", getItemsBySection);
router.get("/selected/drinks", getSelectedDrinks);
router.get("/selected/food", getSelectedFood);
router.get("/drink/:slug", getDrinkBySlug);
router.get("/sandwich/:slug", getSandwichBySlug);
router.get("/pastrie/:slug", getPastrieBySlug);
