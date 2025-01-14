import express from "express";
import multer from "multer";
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

app.post('/uploads/:id', upload.single('image'), (req, res) => {
  const {id} = req.params;
  const imageUrl = `/uploads/${req.file.filename}`

  const product = products.find(p => p.id === parseInt(id))

  if (product) {
    product.imageURL = imageUrl;
    res.json({message: 'image added', product})
  } else {
    res.status(404).json({message: 'product was not found'})
  }
})

app.get("/api", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log((`Server is running at http://localhost:${PORT}`));
})
