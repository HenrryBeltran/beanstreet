import { Router } from "express";
import {
  addToCart,
  deleteFromTheCart,
  getAllItemsFromCart,
  getItemsCountFromCart,
  updateItemFromCart,
} from "../controllers/cartController.js";

export const router = Router();

router
  .route("/")
  .get(getAllItemsFromCart)
  .post(addToCart)
  .patch(updateItemFromCart)
  .delete(deleteFromTheCart);

router.route("/count").get(getItemsCountFromCart);
