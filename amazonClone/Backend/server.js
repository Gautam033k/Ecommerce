import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (req, res) => {
  res.status(200).json(data.products);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running at port ${port} successfully`);
});
