import dotenv from 'dotenv';
import express from 'express';
import colors from 'colors';
import connectDB from './config/db.js';

const app = express();
dotenv.config();
connectDB();

//routes
import productRoutes from './routes/productRoutes.js';
import { errorHandler } from './middleware/error.js';
app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.send('server up');
});
app.use(errorHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `server started at port ${process.env.PORT} in ${process.env.NODE_ENV}`
      .yellow.bold,
  );
});
