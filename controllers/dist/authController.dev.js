"use strict";

var express = require('express');

var bcrypt = require('bcryptjs');

var User = require('../models/users');

var router = express.Router();
router.post('/register', function _callee(req, res) {
  var email, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          email = req.body.email;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          if (!_context.sent) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            error: 'User already exists'
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(User.create(req.body));

        case 8:
          user = _context.sent;
          user.password = undefined;
          return _context.abrupt("return", res.send({
            user: user
          }));

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          res.status(400).send({
            error: 'Registration failed'
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
});

module.exports = function (app) {
  return app.use('/auth', router);
};