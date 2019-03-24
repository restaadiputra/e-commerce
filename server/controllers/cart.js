const { Cart } = require('../models');

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
    .then(function(product) {
      if(product) {
        res.status(200).json(product);
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


// function addCart({ body, decoded }, res, next) {
//   body.userId = decoded.id

//   Promise.all([
//     Cart.findOne({ userId: decoded.id }),
//     Product.findById(body.productId)
//   ])
//   .then(function([cart, product]) {
//     if(!cart) {
//       if(product.stock < body.amount) {
//         res.status(400).json({
//           message: `The stock of ${product.name} is less than that customer want to buy.`
//         })
//       } else {
//         Cart
//         .create({
//           userId: body.userId,
//           productlist: [{
//             productId: body.productId,
//             amount: body.amount
//           }]
//         })
//         .then(function(cart) {
//           res.status(201).json(cart)
//         })
//         .catch(function(err) {
//           throw new Error(err)
//         })
//       } 
//     } else {
//       let availableStock = product.stock

//       cart.productlist.map(product => {
//         if(product.productId == body.productId) {
//           availableStock -= product.amount
//         }
//       })

//       if(availableStock < body.amount) {
//         res.status(400).json({
//           message: `The stock of ${product.name} is less than that customer want to buy.`
//         })
//       } else {
//         cart.productlist.push({
//           productId: body.productId,
//           amount: body.amount
//         })
//         cart
//           .save()
//           .then(function(cart) {
//             res.status(201).json(cart)
//           })
//           .catch(function(err) {
//             throw new Error(err)
//           })
//       }    
//     }
//   })
//   .catch(function(err) {
//     next(err)
//   })


module.exports = {
  findOneByUser,
  addCart,
  deleteCart
}