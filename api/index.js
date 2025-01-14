import express from "express";
import products from '../products.json'

const app = express();

app.get("/api", (req, res) => {
  res.json(products);
});

export default app;
