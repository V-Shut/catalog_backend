import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 3000;

const goods = [
  {
    title: "test",
    price: 300,
    producer: "test",
    image: "cat.svg",
  },
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.json());

app.get("/", (req, res) => {
  res.json(goods);
});

app.post("/", upload.single("image"), (req, res) => {
  const { title, price, producer } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const newGood = {
    title,
    price: Number(price),
    producer,
    image,
  };

  goods.push(newGood);
  res.json({ message: "Товар додано успішно!", good: newGood });
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
