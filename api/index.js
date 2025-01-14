import express from "express";
import path from "path";

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

app.use('/static', express.static(path.join(__dirname, 'public/img')));

app.get("/api", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log((`Server is running at http://localhost:${PORT}`));
})
