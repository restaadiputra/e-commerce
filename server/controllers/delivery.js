const { Delivery } = require('../models');

function findAll(req, res, next) {
  if(req.decoded.role === 'admin') {
    Delivery
      .find({})
      .then(function(deliveries) {
        res.status(200).json(deliveries);
      })
      .catch(function (err) {
        next(err)
      })
  } else {
    Delivery
      .find({ _id: req.decoded.id })
      .then(function(deliveries) {
        res.status(200).json(deliveries);
      })
      .catch(function (err) {
        next(err)
      })
  }
}

module.exports = {
  findAll
}