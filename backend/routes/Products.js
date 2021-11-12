const express = require('express')
const router= express.Router();

const { getProducts, newProduct, getsingleProduct, updateProduct, deleteProduct }= require('../controllers/ProductController');

router.route('/products').get(getProducts);

router.route('/product/:id').get(getsingleProduct);

router.route('/admin/product/new').post(newProduct);

router.route('/admin/product/:id').put(updateProduct)
                                  .delete(deleteProduct);

module.exports = router;