import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { router as authRouter } from "./routes/auth";
import { router as cartRouter } from "./routes/cart";
import { router as itemRouter } from "./routes/item";
import { router as userRouter } from "./routes/user";
import serverless from "serverless-http";

// const port = process.env.PORT ?? 3500;
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",");

const app = express();

app.use(
  cors({
    origin(requestOrigin, callback) {
      function checkOrgin() {
        if (process.env.NODE_ENVIRONMENT === "development") {
          return !requestOrigin;
        }
        return false;
      }

      if (checkOrgin() || allowedOrigins?.includes(requestOrigin!)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api", (_req, res) => res.json({ message: "Hi from Beanstreet Api!" }));
app.use("/api/item", itemRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.use("*", (_req, res) => {
  res.status(404).json({ message: "Api route not found" });
});

// app.listen(port, () => {
//   console.log(`Listen server on ${port}`);
// });

export const handler = serverless(app);
