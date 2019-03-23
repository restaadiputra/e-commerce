const router = require('express').Router();
const products = require('./products');
const user = require('./user');
const carts = require('./carts');


router.use('/products', products);
router.use('/user', user);
router.use('/carts', carts)

module.exports = router;
