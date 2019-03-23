const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  productlist: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      amount: {
        type: Number,
        required: [true, 'Stock must be filled.'],
        min: [1, 'Stock cannot be zero.']
      }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;