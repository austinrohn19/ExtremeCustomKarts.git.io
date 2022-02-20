const express = require('express')
const router = express.Router();

const { getProducts, newProduct, getsingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews,deleteProductReview,  } = require('../controllers/ProductController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);

router.route('/product/:id').get(getsingleProduct);

//because of isAuthenticatedUser users will not be able to post a new product without being authenticated as admins

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

//because of isAuthenticatedUser users will not be able to update or delete a product without being authenticated as admins
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;