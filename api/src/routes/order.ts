import { Router } from "express";
import {
  addToCart,
  deleteFromTheCart,
  getAllItemsFromCart,
  updateItemFromCart,
} from "../controllers/orderController";

export const router = Router();

router
  .route("/cart")
  .get(getAllItemsFromCart)
  .post(addToCart)
  .patch(updateItemFromCart)
  .delete(deleteFromTheCart);
