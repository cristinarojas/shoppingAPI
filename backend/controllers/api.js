// Here we have all our routes.
// Dependencies
import express from 'express';

// Importing all the methods that I have in the model
import {
  findAllProducts,
  findProductBySlug,
  createProduct,
  updateProduct,
  removeProduct
} from '../models/Product';

// Routes
const router = express.Router();

// Home end point to see general end points
router.get('/', (req, res, next) => { // Im using this path by url or postman
  res.send(`
    <p>API Endpoint</p>
    <p><a href="/api/products">/api/products</a></p>
    <p><a href="/api/products/:id">/api/products/:id</a></p>
  `);
});

// Find all products data - get method
router.get('/products', (req, res, next) => { // Im using this path by url or postman
  findAllProducts(products => {
    res.json({
      response: products
    });
  });
});

// Find product by slug - get method
router.get('/product/:slug', (req, res, next) => { // Im using this path by url or postman
  // Obtaining the data that is in req.
  const { params: { slug } } = req;

  findProductBySlug(slug, singleProduct => {
    console.log('single', singleProduct);

    if (!singleProduct || singleProduct.length === 0) {
      res.send({
        error: true,
        message: 'Product not found'
      });
    } else {
      res.json({
        response: singleProduct
      });
    }
  });
});

// Create new product - post method
router.post('/product', (req, res, next) => { // Im using this path by url or postman
  const { productName, productPrice, productAvailable } = req.body;

  createProduct({ // executing this method that is in model section.
    productName,
    productPrice,
    productAvailable
  }, (data, error = false) => {
    if (error) {
      res.json({
        error: true,
        details: error
      });
    } else {
      res.json({
        response: {
          saved: true,
          product: data
        }
      });
    }
  });
});

// Delete product
router.delete('/product/:slug', (req, res, next) => {
  const { params: { slug } } = req;

  removeProduct(slug, (removed, error) => {
    if(error) {
      res.json({
        error: true,
        message: 'Error removing product'
      });
    } else {
      res.json({
        response: {
          removed: true
        }
      })
    }
  });
});

// Put method to update the product
router.put('/product/:slug', (req, res, next) => {
  const {
    params: {
      slug
    }
  } = req;

  updateProduct(slug, req.body, (affected, error) => {
    if (error) {
      res.json({
        error: true,
        message: 'Error trying to update product'
      });
    } else {
      res.json({
        response: {
          updated: true,
          affected
        }
      })
    }
  });
});

export default router;
