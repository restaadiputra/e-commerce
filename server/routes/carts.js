const carts = require('express').Router();
const { CartController } = require('../controllers');
const { authenticate } = require('../middlewares/authenticate')

carts.use('/', authenticate);
carts.get('/', CartController.findOneByUser);
carts.post('/', CartController.addCart);
carts.delete('/:id', CartController.deleteCart);

module.exports = carts