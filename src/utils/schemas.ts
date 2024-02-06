import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .max(64, { message: "Your name must be less than 64 characters." }),
  email: z
    .string()
    .max(320, { message: "Your email must be less than 320 characters." })
    .refine((value) => value.length > 0, { message: "Email is required." }),
  password: z
    .string()
    .min(8, { message: "Your password must be at least 8 characters." })
    .max(32, { message: "Your password must be less than 32 characters." }),
});
