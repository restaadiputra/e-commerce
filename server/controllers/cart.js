const { Cart, Delivery } = require('../models');

function findOneByUser({ decoded }, res, next) {
    Cart
    .find({ userId: decoded.id })
    .populate('productId')
    .then(function(cart) {
      res.status(200).json(cart)
    })
    .catch(function(err) {
      next(err)
    })
}

function addCart({ body, decoded }, res, next) {
  Cart
    .create({
      userId: decoded.id,
      productId: body.productId,
      amount: body.amount
    })
    .then(function(cart) {
      res.status(201).json(cart)
    })
    .catch(function(err) {
      next(err)
    })
}

function deleteCart({ params }, res, next) {
  Cart
    .findOneAndDelete({ _id: params.id })
    .then(function(cart) {
      if(cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json({
          message: 'No Cart was found.'
        })
      }
    })
    .catch(function(err) {
      next(err);
    });
}

function patchManyCart({ decoded, body }, res, next) {
  Cart
    .update({ userId: decoded.id }, { status: body.status }, { multi: true })
    .then(function(carts) {
      if(carts.n === carts.nModified) {
        return Cart.find({ userId: decoded.id })
      } else {
        res.status(404).json({
          message: 'Carts not found'
        })
      }
    })
    .then(function(carts) {
      const patchCarts = carts.map(e => e._id)
console.log(body)
      return Delivery
        .create({
          userId: decoded.id,
          carts: patchCarts,
          personalInfo: {
            fullname: body.fullname,
            address: body.address,
            poscode: body.poscode,
            payment: body.payment
          }
        })
    })
    .then(function(delivery) {
      res.status(200).json(delivery)
    })
    .catch(function(err) {
      next(err);
    });
}

module.exports = {
  findOneByUser,
  addCart,
  deleteCart,
  patchManyCart
}