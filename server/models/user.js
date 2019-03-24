const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'Name must be filled.'],
    minlength: [5, 'Name length must be higher than 5 character']
  },
  username: {
    type: String,
    required: [true, 'Username must be filled.'],
    minlength: [5, 'Username length must be higher than 5 character']
  },
  password: {
    type: String,
    required: [true, 'Password must be filled.'],
    minlength: [8, 'Password length must be higher than 8 character']
  },
  email: {
    type: String,
    required: [true, 'Email must be filled.'],
    unique: true,
    validate: [{
      validator: function (value) {
        return User
          .findOne({
            email: value
          })
          .then(user => {
            if (!user) {
              return true;
            } else {
              if (user._id.toString() === this._id.toString()) {
                return true;
              }
              return false;
            }
          })
          .catch(err => {
            return false;
          })
      },
      message: `Email had been taken`
    }, {
      validator: function (v) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(v).toLowerCase());
      },
      message: 'Wrong email format'
    }]
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    default: 'customer',
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

userSchema.pre('save', function (next) {
  if (this.password) {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(this.password, salt)
    this.password = hash
  }
  next()
})

const User = mongoose.model('User', userSchema);

module.exports = User;