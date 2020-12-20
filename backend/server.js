import dotenv from 'dotenv';
import express from 'express';
import colors from 'colors';
import connectDB from './config/db.js';
import cors from 'cors';
const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
//routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler } from './middleware/error.js';
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID),
);
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
