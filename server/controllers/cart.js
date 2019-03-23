const { Cart, Product } = require('../models');

function findOneByUser({ decoded }, res, next) {
  Cart
    .findOne({ userId: decoded.id })
    .then(function(cart) {
      res.status(200).json(cart)
    })
    .catch(function(err) {
      next(err)
    })
}

function addCart({ body, decoded }, res, next) {
  body.userId = decoded.id

  Promise.all([
    Cart.findOne({ userId: decoded.id }),
    Product.findById(body.productId)
  ])
  .then(function([cart, product]) {
    if(!cart) {
      if(product.stock < body.amount) {
        res.status(400).json({
          message: `The stock of ${product.name} is less than that customer want to buy.`
        })
      } else {
        Cart
        .create({
          userId: body.userId,
          productlist: [{
            productId: body.productId,
            amount: body.amount
          }]
        })
        .then(function(cart) {
          res.status(201).json(cart)
        })
        .catch(function(err) {
          throw new Error(err)
        })
      } 
    } else {
      let availableStock = product.stock

      cart.productlist.map(product => {
        if(product.productId == body.productId) {
          availableStock -= product.amount
        }
      })

      if(availableStock < body.amount) {
        res.status(400).json({
          message: `The stock of ${product.name} is less than that customer want to buy.`
        })
      } else {
        cart.productlist.push({
          productId: body.productId,
          amount: body.amount
        })
        cart
          .save()
          .then(function(cart) {
            res.status(201).json(cart)
          })
          .catch(function(err) {
            throw new Error(err)
          })
      }    
    }
  })
  .catch(function(err) {
    next(err)
  })

  // Product
  //   .findById(body.itemId)
  //   .then(function(product) {
  //     console.log(product)
  //     if(product.stock < body.amount) {
  //       res.status(400).json({
  //         message: `the stock of ${product.name} is less than that customer want to buy.`
  //       })
  //     } else {
  //       Cart
  //         .findOne({ userId: decoded.id })
  //         .then(function(cart) {
  //           if(cart) {
  //             cart.itemlist.push({
  //               itemId: body.itemId,
  //               amount: body.amount
  //             })
  //             cart
  //               .save()
  //               .then(function(cart) {
  //                 res.status(201).json(cart)
  //               })
  //               .catch(function(err) {
  //                 throw new Error(err)
  //               })
  //           } else {
  //             Cart
  //               .create({
  //                 userId: body.userId,
  //                 itemlist: [{
  //                   itemId: body.itemId,
  //                   amount: body.amount
  //                 }]
  //               })
  //               .then(function(cart) {
  //                 res.status(201).json(cart)
  //               }).catch(function(err) {
  //                 throw new Error(err)
  //               })
  //           }
  //         })
  //         .catch(function(err) {
  //           throw new Error(err)
  //         })
  //     }
  //   })
  //   .catch(function(err) {
  //     next(err)
  //   })

}

module.exports = {
  findOneByUser,
  addCart
}