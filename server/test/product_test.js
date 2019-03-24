const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../app');
const {
  Product
} = require('../models')
chai.use(chaiHttp);


let token = ''
let product_id = ''
let newProduct = {
  name: 'Roti',
  description: 'Roti Bakar',
  category: 'Makanan',
  price: 10000,
  stock: 10
}

let editProduct = {
  name: 'Roti Edit',
  description: 'Roti Bakar Edit',
  category: 'Makanan',
  price: 10000,
  stock: 10
}


// test for user register
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
    Product.deleteMany({}, function (err) {
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


  describe('POST /products', function () {
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

    describe('Fail: ', function () {
      it('Without sign in: Should return status 401 with message: Need Login first.', function (done) {
        let newProduct = {
          name: 'Kue',
          description: 'Kue Pandan',
          category: 'Makanan',
          price: 9000,
          stock: 10000
        };

        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body.message).to.be.equal('Need Login first.');
            done();
          })
      })

      it('With same "Name": Should return status 409 with message: Product has been added, please update to change.', function (done) {
        let newProduct = {
          name: 'Roti',
          description: 'Roti Bakar',
          category: 'Makanan',
          price: 10000,
          stock: 10
        };

        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Product has been added, please update to change.');
            done();
          })
      })

      it('With empty "Name": Should return status 409 with message: Name must be filled.', function (done) {
        let newProduct = {
          name: '',
          description: 'Roti Bakar',
          category: 'Makanan',
          price: 10000,
          stock: 10
        };

        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Name must be filled.');
            done();
          })
      })

      it('With empty "Description": Should return status 409 with message: Name must be filled.', function (done) {
        let newProduct = {
          name: 'Kue',
          description: '',
          category: 'Makanan',
          price: 10000,
          stock: 10
        };

        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Description must be filled.');
            done();
          })
      })

      it('With empty "Price": Should return status 409 with message: Price must be filled.', function (done) {
        let newProduct = {
          name: 'Kue',
          description: 'Kue Pandan',
          category: 'Makanan',
          price: '',
          stock: 10
        };

        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Price must be filled.');
            done();
          })
      })

      it('With 0 "Price": Should return status 409 with message: Price cannot be zero.', function (done) {
        let newProduct = {
          name: 'Kue',
          description: 'Kue Pandan',
          category: 'Makanan',
          price: 0,
          stock: 10
        };

        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Price cannot be zero.');
            done();
          })
      })

      it('With empty "Price": Should return status 409 with message: Stock must be filled.', function (done) {
        let newProduct = {
          name: 'Kue',
          description: 'Kue Pandan',
          category: 'Makanan',
          price: 9000,
          stock: ''
        };

        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Stock must be filled.');
            done();
          })
      })

      it('With 0 "Price": Should return status 409 with message: Stock cannot be zero.', function (done) {
        let newProduct = {
          name: 'Kue',
          description: 'Kue Pandan',
          category: 'Makanan',
          price: 9000,
          stock: 0
        };

        chai
          .request(app)
          .post('/products')
          .send(newProduct)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Stock cannot be zero.');
            done();
          })
      })
    })
  })

  describe('GET /products', function () {
    describe('Success: ', function () {
      it('Should return an array of object of products/an empty array with status 200', function (done) {
        chai
          .request(app)
          .get('/products')
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.equal(null);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array')
            expect(res.body[0]).to.have.property('name')
            expect(res.body[0]).to.have.property('description')
            expect(res.body[0]).to.have.property('category')
            expect(res.body[0]).to.have.property('price')
            expect(res.body[0]).to.have.property('stock')
            done()
          })

      })
    })
  })

  describe('GET /products/:id', function () {
    describe('Success: ', function () {
      it('Should return an object of product with status 200', function (done) {
        chai
          .request(app)
          .get(`/products/${product_id}`)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.equal(null);
            expect(res).to.have.status(200);
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
            done()
          })

      })
    })

    describe('Fail: ', function () {
      it('With non-exist id: Should return status 404 with message: No Product found.', function (done) {
        chai
          .request(app)
          .get(`/products/5c910d31da5e1c36ca130f02`)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body.message).to.be.equal('No Product found.');
            done();
          })
      })
    })
  })

  describe('PUT /products/:id', function () {
    describe('Success: ', function () {
      it('Should return an object of edited products array with status 200', function (done) {
        chai
          .request(app)
          .put(`/products/${product_id}`)
          .send(editProduct)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.equal(null);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('name')
            expect(res.body).to.have.property('description')
            expect(res.body).to.have.property('category')
            expect(res.body).to.have.property('price')
            expect(res.body).to.have.property('stock')
            expect(res.body.name).to.equal(editProduct.name)
            expect(res.body.description).to.equal(editProduct.description)
            expect(res.body.category).to.equal(editProduct.category)
            expect(res.body.price).to.equal(editProduct.price)
            expect(res.body.stock).to.equal(editProduct.stock)
            done()
          })

      })
    })

    describe('Fail: ', function () {
      it('Without sign in: Should return status 401 with message: Need Login first.', function (done) {
        chai
          .request(app)
          .put(`/products/${product_id}`)
          .send(editProduct)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body.message).to.be.equal('Need Login first.');
            done();
          })

        it('With non-exist id: Should return status 404 with message: No Product found.', function (done) {
          chai
            .request(app)
            .put(`/products/5c910d31da5e1c36ca130f02`)
            .send(editProduct)
            .set('token', token)
            .end(function (err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(404);
              expect(res.body.message).to.be.equal('No Product found.');
              done();
            })
        })
      })
    })
  })


  describe('DELETE /products/:id', function () {
    describe('Success: ', function () {
      it('Should return an object of edited products array with status 200', function (done) {
        chai
          .request(app)
          .delete(`/products/${product_id}`)
          .set('token', token)
          .end(function (err, res) {
            expect(err).to.equal(null);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('name')
            expect(res.body).to.have.property('description')
            expect(res.body).to.have.property('category')
            expect(res.body).to.have.property('price')
            expect(res.body).to.have.property('stock')
            expect(res.body.name).to.equal(editProduct.name)
            expect(res.body.description).to.equal(editProduct.description)
            expect(res.body.category).to.equal(editProduct.category)
            expect(res.body.price).to.equal(editProduct.price)
            expect(res.body.stock).to.equal(editProduct.stock)
            done()
          })

      })
    })

    describe('Fail: ', function () {
      it('Without sign in: Should return status 401 with message: Need Login first.', function (done) {
        chai
          .request(app)
          .delete(`/products/${product_id}`)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body.message).to.be.equal('Need Login first.');
            done();
          })

        it('With non-exist id: Should return status 404 with message: No Product found.', function (done) {
          chai
            .request(app)
            .delete(`/products/5c910d31da5e1c36ca130f02`)
            .send(editProduct)
            .set('token', token)
            .end(function (err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(404);
              expect(res.body.message).to.be.equal('No Product found.');
              done();
            })
        })
      })
    })
  })

})