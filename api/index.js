import express from "express";
import multer from "multer";
import path from "path";

const app = express();

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
    cb(null, "public/images/");
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

app.use("/images", express.static(path.join(process.cwd(), "public/images")));

export default (req, res) => {
  app(req, res);
};
