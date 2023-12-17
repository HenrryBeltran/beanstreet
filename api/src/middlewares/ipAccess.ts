import type { RequestHandler } from "express";

const notAllowedIPS = ["127.0.0.1", "::1", "192.168.18.1"];

export const ipAccess: RequestHandler = (req, res, next) => {
  if (process.env.NODE_ENVIRONMENT === "development") {
    next();
    return;
  }

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ipList = typeof ip === "string" ? [ip] : ip;

  if (ipList?.some(value => notAllowedIPS.includes(value))) {
    res.status(401).end("Not Allowed");
  } else {
    next();
  }
};
