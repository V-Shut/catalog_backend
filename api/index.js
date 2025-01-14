import express from "express";
import products from '../products.json'

const app = express();
const PORT = 3000;

const products = [
  {
    title: "test",
    price: 300,
    producer: "test",
    imageURL: "",
  },
];

app.get("/api", (req, res) => {
  res.json(products);
});

export default app;
