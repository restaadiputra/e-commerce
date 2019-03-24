const { Product } = require('../models');

function findAll({ query }, res, next) {
  q = {}
  if(query && query.q) {
    q = q.split('+').join(' ')
  }

  Product
    .find(q)
    .then(function(products) {
      res.status(200).json(products)
    })
    .catch(function(err) {
      next(err)
    })
}

function findOne({ params }, res, next) {
  Product
    .findById(params.id)
    .then(function(product) {
      if(product) {
        res.status(200).json(product)
      } else {
        res.status(404).json({
          message: 'No Product found.'
        })
      }
    })
    .catch(function(err) {
      next(err)
    })
}

function create({ body, decoded, file }, res, next) {
  body.userId = decoded.id;
  body.image = file ? file.cloudStoragePublicUrl : '';
  Product
    .create({...body})
    .then(function(product) {
      res.status(201).json(product);
    })
    .catch(function(err) {
      if(err.errors.name) {
        res.status(409).json({
          message: err.errors.name.message
        });
      } else if(err.errors.description) {
        res.status(409).json({
          message: err.errors.description.message
        });
      } else if(err.errors.price) {
        res.status(409).json({
          message: err.errors.price.message
        });
      } else if(err.errors.stock) {
        res.status(409).json({
          message: err.errors.stock.message
        });
      } else {
        next(err);
      }
    });
}

function updateOne({ params, body }, res, next) {
  const opts = {
    new: true,
    runValidators: true,
    context: 'query'
  }

  Product
    .findOneAndUpdate({ _id: params.id }, { ...body }, opts)
    .then(function(product) {
      if(product) {
        res.status(200).json(product)
      } else {
        res.status(404).json({
          message: 'No Product found.'
        })
      }
    })
    .catch(function(err) {
      next(err)
    })
}

function deleteOne({ params }, res, next) {
  Product
    .findOneAndDelete({ _id: params.id })
    .then(function(product) {
      if(product) {
        res.status(200).json(product)
      } else {
        res.status(404).json({
          message: 'No Product found.'
        })
      }
    })
    .catch(function(err) {
      next(err)
    })
}

module.exports = {
  findAll,
  findOne,
  create,
  updateOne,
  deleteOne
}