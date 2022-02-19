"use strict";

var Mongoose = require("mongoose");

var Joi = require('joi');

var Joigoose = require('joigoose')(Mongoose);

var bcrypt = require('bcryptjs');

var joiUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  //Joi.string().required().error(new Error('Email is required!')),
  password: Joi.string() //Joi.required().error(new Error('password is required!')),

});
var mongooseUserSchema = new Mongoose.Schema(Joigoose.convert(joiUserSchema));
mongooseUserSchema.pre('save', function _callee(next) {
  var hash;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 10));

        case 2:
          hash = _context.sent;
          this.password = hash;
          next();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
module.exports = Mongoose.model('user', mongooseUserSchema);