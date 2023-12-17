import { Router } from "express";
import {
  getAllCountItems,
  getAllItems,
  getCountItemsBySection,
  getDrinkBySlug,
  getItemsBySection,
  getPastrieBySlug,
  getSandwichBySlug,
  getSelectedDrinks,
  getSelectedFood,
} from "../controllers/itemController.js";

export const router = Router();

router.get("/", getAllItems);
router.get("/count", getAllCountItems);
router.get("/section/:slug", getItemsBySection);
router.get("/section/count/:slug", getCountItemsBySection);
router.get("/selected/drinks", getSelectedDrinks);
router.get("/selected/food", getSelectedFood);
router.get("/drink/:slug", getDrinkBySlug);
router.get("/sandwich/:slug", getSandwichBySlug);
router.get("/pastrie/:slug", getPastrieBySlug);
