const products = require('express').Router();
const { ProductController } = require('../controllers');
const { authenticate } = require('../middlewares/authenticate');
const { multer, uploadToGCS } = require('../middlewares/image');

products.get('/', ProductController.findAll);
products.get('/:id', ProductController.findOne);
products.get('/user', authenticate, ProductController.findAllByUserId)
products.post('/', authenticate,  multer.single('image'), uploadToGCS, ProductController.create);
products.put('/:id', authenticate, multer.single('image'), uploadToGCS, ProductController.updateOne);
products.delete('/:id', authenticate, ProductController.deleteOne);

module.exports = products;

