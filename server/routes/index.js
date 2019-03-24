const router = require('express').Router();
const products = require('./products');
const users = require('./users');
const carts = require('./carts');
const admin = require('./admin');

router.use('/products', products);
router.use('/users', users);
router.use('/carts', carts);
router.use('/admin', admin);

module.exports = router;
