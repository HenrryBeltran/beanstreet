import type { CorsOptions } from "cors";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",");

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins?.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS in origin ${origin}`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
