import express from 'express';
import Product from '../models/productModel.js';

const productRoutes = express.Router();

productRoutes.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRoutes.use('/slug/:slug', async (req, res) => {
  const product = Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'product Not found' });
  }
  res.status(200).json(data.products);
});

productRoutes.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRoutes;
