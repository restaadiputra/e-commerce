const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../app');
const {
  Cart
} = require('../models')
chai.use(chaiHttp);


let token = ''
let product_id = ''
let cart_id = ''
let newProduct = {
  name: 'Roti',
  description: 'Roti Bakar',
  category: 'Makanan',
  price: 10000,
  stock: 10
}

describe('Product End Point Test', function () {
  // test mongodb connection before test begin
  before(function (done) {
    mongoose.connect('mongodb://localhost/ecommerce', {
      useNewUrlParser: true,
      useCreateIndex: true
    }, function () {
      mongoose.connection.db.dropDatabase();
      done();
    });
  })

  // delete User in mongodb
  before(function (done) {
    Cart.deleteMany({}, function (err) {
      done();
    });
  });

  describe('Register for new user', function () {
    it('Should return an object of new user', function (done) {
      const newUser = {
        fullname: 'New User',
        username: 'newuser',
        password: '123456789',
        email: 'user@mail.com'
      };

      chai
        .request(app)
        .post('/users/register')
        .send(newUser)
        .end(function (err, res) {
          done()
        })
    })

    it('Should return an object filled with token', function (done) {
      const userData = {
        username: 'newuser',
        password: '123456789',
      };

      chai
        .request(app)
        .post('/users/signin')
        .send(userData)
        .end(function (err, res) {
          token = res.body.token
          done();
        })

    })
  })

  describe('Success: ', function () {
    it('Should return an object of new product with status 201', function (done) {
      chai
        .request(app)
        .post('/products')
        .send(newProduct)
        .set('token', token)
        .end(function (err, res) {
          expect(err).to.equal(null);
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('description')
          expect(res.body).to.have.property('category')
          expect(res.body).to.have.property('price')
          expect(res.body).to.have.property('stock')
          expect(res.body.name).to.equal(newProduct.name)
          expect(res.body.description).to.equal(newProduct.description)
          expect(res.body.category).to.equal(newProduct.category)
          expect(res.body.price).to.equal(newProduct.price)
          expect(res.body.stock).to.equal(newProduct.stock)
          product_id = res.body._id;
          done();
        })

    })
  })


  describe('POST /carts', function () {
    describe('Success: ', function () {
      it('Should return an object of new product with status 201', function (done) {
        chai
          .request(app)
          .post('/carts')
          .send({
            productId: product_id,
            amount: 5
          })
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.equal(null);
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('userId')
            expect(res.body).to.have.property('productId')
            expect(res.body).to.have.property('amount')
            expect(res.body.productId).to.equal(product_id)
            expect(res.body.amount).to.equal(5)
            cart_id = res.body._id;
            done();
          })

      })
    })

    describe('Fail: ', function () {
      it('Without sign in: Should return status 401 with message: Need Login first.', function (done) {

        chai
          .request(app)
          .post('/products')
          .send({
            productId: product_id,
            amount: 5
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body.message).to.be.equal('Need Login first.');
            done();
          })
      })
    })

  
  })



  describe('DELETE /carts', function () {
    describe('Success: ', function () {
      it('Should return an object of product with status 201', function (done) {
        chai
          .request(app)
          .delete(`/carts/${cart_id}`)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.equal(null);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('userId')
            expect(res.body).to.have.property('productId')
            expect(res.body).to.have.property('amount')
            expect(res.body.productId).to.equal(product_id)
            expect(res.body.amount).to.equal(5)
            product_id = res.body._id;
            done();
          })

      })
    })

    describe('Fail: ', function () {
      it('Without sign in: Should return status 401 with message: Need Login first.', function (done) {

        chai
          .request(app)
          .post('/products')
          .send({
            productId: product_id,
            amount: 5
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body.message).to.be.equal('Need Login first.');
            done();
          })
      })
    })

  
  })
})