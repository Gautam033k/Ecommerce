import express, { urlencoded } from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRoutes from './routes/productRoute.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRoutes);
app.use('/api/users', userRouter);

const port = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`server running at port ${port} successfully`);
});
