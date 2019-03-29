const jwt = require('jsonwebtoken');
const { User, Cart } = require('../models');
const secret = process.env.JWT_SECRET

module.exports = {
  authenticate(req, res, next) {
    jwt.verify(req.headers.token, secret, (err, decoded) => {
      if (!err) {
        User.findById(decoded.id, (err, user) => {
          if (!err) {
            if (user) {
              req.decoded = decoded
              next()
            } else {
              res.status(400).json({
                warning: 'Invalid token!'
              })
            }
          } else {
            res.status(401).json({
              message: 'Need Login first.'
            })
          }
        })
      } else {
        res.status(401).json({
          message: 'Need Login first.'
        })
      }
    });
  },
  cartAuthorize({ decoded }, res, next) {
    Cart
      .find({ userId: decoded.id })
      .then(carts => {
        const temp = carts.filter(cart => String(cart.userId) !== decoded.id)
        if(temp.length === 0 ) {
          next()
        } else {
          res.status(401).json({
            message: 'You are not authorize to access this data.'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: err
        })
      })
  },
}