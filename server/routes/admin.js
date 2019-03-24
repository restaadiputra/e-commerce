const admin = require('express').Router();
const { UserController } = require('../controllers');

admin.post('/register', UserController.register);
admin.post('/signin', UserController.signin);

module.exports = admin;