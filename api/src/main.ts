import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { router as authRouter } from "./routes/auth.js";
import { router as cartRouter } from "./routes/cart.js";
import { router as itemRouter } from "./routes/item.js";
import { router as offerRouter } from "./routes/offer.js";
import { router as userRouter } from "./routes/user.js";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",");
const port = process.env.PORT ?? 3500;

export const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins?.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS in origin ${origin}`));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/api", (_, res) => res.json({ message: "Hi from Beanstreet Api!" }));
app.use("/api/item", itemRouter);
app.use("/api/offer", offerRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.use("/api/*", (_req, res) => {
  res.status(405).json({ message: "Api route not found" });
});

app.listen(port, () => console.log(`~ Running on ${process.env.SITE_URL}:${port}`));
