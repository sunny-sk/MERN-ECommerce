import dotenv from 'dotenv';
import express from 'express';
import colors from 'colors';
import products from './data/products.js';
import connectDB from './config/db.js';

const app = express();
dotenv.config();
connectDB();

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id == req.params.id);
  res.json(product);
});
app.get('/api/products', (req, res) => {
  res.json(products);
});
app.get('/', (req, res) => {
  res.send('asdfg');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `server started at port ${process.env.PORT} in ${process.env.NODE_ENV}`
      .yellow.bold,
  );
});
