import { insertCartItemSchema } from "@/drizzle/schemas";

export const addItemToCartSchema = insertCartItemSchema
  .omit({
    unitPrice: true,
    unitPriceWDiscount: true,
    discount: true,
  })
  .required({ type: true });
