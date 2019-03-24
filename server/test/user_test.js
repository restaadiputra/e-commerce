const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../app');
const { User } = require('../models')

chai.use(chaiHttp);


describe('User End Point Test', function () {

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
    User.deleteMany({}, function (err) {
      done();
    });
  });

  // test for user register
  describe('POST /userss/register', function () {
    describe('Success: ', function () {
      it('Should return an object of user with status 201', function (done) {
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
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('_id')
            expect(res.body).to.have.property('fullname');
            expect(res.body).to.have.property('username');
            expect(res.body).to.have.property('password');
            expect(res.body).to.have.property('email');
            expect(res.body.fullname).to.equal(newUser.fullname);
            expect(res.body.username).to.equal(newUser.username);
            expect(res.body.email).to.equal(newUser.email);
            expect(res.err).to.be.not.null
            user_id = res.body._id;
            done();
          })

      })
    })

    describe('Fail: ', function () {
      it('Should return status 409 with message: Email had been taken', function (done) {
        const sameUser = {
          fullname: 'New User',
          username: 'newuser',
          password: '123456789',
          email: 'user@mail.com'
        };

        chai
          .request(app)
          .post('/users/register')
          .send(sameUser)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Email had been taken');
            done();
          })
      })

      it('Should return status 409 with message: Name must be filled.', function (done) {
        const sameUser = {
          fullname: '',
          username: 'newuser',
          password: '123456789',
          email: 'user2@mail.com'
        };

        chai
          .request(app)
          .post('/users/register')
          .send(sameUser)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Name must be filled.');
            done();
          })

      })

      it('Should return status 409 with message: Username must be filled.', function (done) {
        const sameUser = {
          fullname: 'anotheruser',
          username: '',
          password: '123456789',
          email: 'user2@mail.com'
        };

        chai
          .request(app)
          .post('/users/register')
          .send(sameUser)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Username must be filled.');
            done();
          })

      })

      it('Should return status 409 with message: Password must be filled.', function (done) {
        const sameUser = {
          fullname: 'anotheruser',
          username: 'anotheruser',
          password: '',
          email: 'user2@mail.com'
        };

        chai
          .request(app)
          .post('/users/register')
          .send(sameUser)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Password must be filled.');
            done();
          })

      })

      it('Should return status 409 with message: Password must be filled.', function (done) {
        const sameUser = {
          fullname: 'anotheruser',
          username: 'anotheruser',
          password: '12345678',
          email: ''
        };

        chai
          .request(app)
          .post('/users/register')
          .send(sameUser)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(409);
            expect(res.body.message).to.be.equal('Email must be filled.');
            done();
          })

      })
    })
  })

  // test for user sign in
  describe('POST /userss/signin', function () {
    describe('Success: ', function () {
      it('Should return an object filled with token and fullname with status 201', function (done) {
        const userData = {
          username: 'newuser',
          password: '123456789',
        };

        chai
          .request(app)
          .post('/users/signin')
          .send(userData)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('token')
            expect(res.body).to.have.property('fullname');
            done();
          })

      })
    })

    describe('Fail: ', function () {
      it('Should return status 400 with message: Username/Password is wrong.', function (done) {
        const userData = {
          username: '',
          password: '123456789',
        };

        chai
          .request(app)
          .post('/users/signin')
          .send(userData)
          .end(function (err, res) {

            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body.message).to.be.equal('Username/Password is wrong.');
            done();
          })

      })

      it('Should return status 400 with message: Username/Password is wrong.', function (done) {
        const userData = {
          username: 'newuser',
          password: '',
        };

        chai
          .request(app)
          .post('/users/signin')
          .send(userData)
          .end(function (err, res) {

            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body.message).to.be.equal('Username/Password is wrong.');
            done();
          })

      })
    })
  })

  after(function (done) {
    User.deleteMany({}, function (err) {
      done();
    });
  });

})