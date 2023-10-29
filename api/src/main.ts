import express from "express";

const app = express();
const port = 3500;

app.get("/", (_req, res) => {
  res.json({ message: "Hi from Express.js!" });
});

app.listen(port, () => {
  console.log(`Listen server on ${port}`);
});
