const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Name must be filled.'],
    validate: {
      validator: function (value) {
        return Product
          .findOne({
            name: value
          })
          .then(product => {
            if (!product) {
              return true
            } else {
              if (product._id.toString() === this._id.toString()) {
                return true
              } else {
                return false
              }
            }
          })
          .catch(err => {
            return true
          })
      },
      message: 'Product has been added, please update to change.'
    }
  },
  description: {
    type: String,
    required: [true, 'Description must be filled.']
  },
  category: String,
  price: {
    type: Number,
    required: [true, 'Price must be filled.'],
    min: [1, 'Price cannot be zero.']
  },
  stock: {
    type: Number,
    required: [true, 'Stock must be filled.'],
    min: [1, 'Stock cannot be zero.']
  },
  image: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;