const products = require('express').Router();
const { ProductController } = require('../controllers');
const { authenticate } = require('../middlewares/authenticate');
const { multer, uploadToGCS } = require('../middlewares/image');


products.use('/', authenticate);
products.get('/', ProductController.findAll);
products.post('/',  multer.single('image'), uploadToGCS, ProductController.create);
products.get('/:id', ProductController.findOne);
products.put('/:id',  multer.single('image'), uploadToGCS, ProductController.updateOne);
products.delete('/:id', ProductController.deleteOne);

module.exports = products;

