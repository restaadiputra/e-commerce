const delivery = require('express').Router();
const { DeliveryController } = require('../controllers');
const { authenticate } = require('../middlewares/authenticate')

delivery.use('/', authenticate);
delivery.get('/', DeliveryController.findAll);

module.exports = delivery;