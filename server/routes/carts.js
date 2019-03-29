const carts = require('express').Router();
const { CartController } = require('../controllers');
const { authenticate, cartAuthorize } = require('../middlewares/authenticate')

carts.use('/', authenticate);
carts.get('/', CartController.findOneByUser);
carts.post('/', CartController.addCart);
carts.delete('/:id', cartAuthorize, CartController.deleteCart);
// carts.put('/:id', cartAuthorize, CartController.updateCart);
carts.patch('/', cartAuthorize, CartController.patchManyCart);

module.exports = carts