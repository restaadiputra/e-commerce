const highlight = require('express').Router();
const { HighlightController } = require('../controllers');
const { authenticate } = require('../middlewares/authenticate');
const { multer, uploadToGCS } = require('../middlewares/image');

highlight.get('/', authenticate, HighlightController.findAll);
highlight.post('/', authenticate,  multer.single('image'), uploadToGCS, HighlightController.create);
highlight.get('/:id', authenticate, HighlightController.updateOne);
highlight.put('/:id', authenticate, multer.single('image'), uploadToGCS, HighlightController.updateOne);
highlight.delete('/:id', authenticate, HighlightController.deleteOne);

module.exports = highlight;