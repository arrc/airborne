'use strict';
var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  crypto = require('crypto');

let PlaneSchema =  mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  isActive: {type: Boolean, default: false},
  isAdmin: {type: Boolean, default: false},

});


module.exports = mongoose.model('Plane', PlaneSchema);
