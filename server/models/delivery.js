const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  personalInfo: {
    type: Schema.Types.Mixed,
  },
  carts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  status: {
    type: String,
    default: 'on delivery'
  },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;