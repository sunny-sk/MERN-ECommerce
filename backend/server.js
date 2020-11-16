require('dotenv').config();
const express = require('express');
const app = express();
const products = require('./data/products');

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
console.log(process.env.PORT);
app.listen(PORT, () => {
  console.log(
    `server started at port ${process.env.PORT} in ${process.env.NODE_ENV}`,
  );
});
