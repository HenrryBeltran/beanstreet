import type { RequestHandler } from "express";

const allowedIPS = process.env.ALLOWED_IPS?.split(",");

export const ipAccess: RequestHandler = (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log("~ IP -", ip);
  console.log("~ Origin -", req.headers.origin);

  if (typeof ip === "string") {
    if (allowedIPS?.includes(ip)) {
      next();
    } else {
      res.status(401).end("Not Allowed");
    }
  } else if (allowedIPS?.some(value => ip?.includes(value))) {
    res.status(401).end("Not Allowed");
  } else {
    next();
  }
};
