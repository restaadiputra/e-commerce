const products = require('express').Router();
const { ProductController } = require('../controllers');
const { authenticate } = require('../middlewares/authenticate')

products.use('/', authenticate)
products.get('/', ProductController.findAll);
products.post('/', ProductController.create);
products.get('/:id', ProductController.findOne);
products.put('/:id', ProductController.updateOne);
products.delete('/:id', ProductController.deleteOne);

module.exports = products;

