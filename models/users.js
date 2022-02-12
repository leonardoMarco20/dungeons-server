const Mongoose = require("mongoose")
const Joi = require('joi')
const Joigoose = require('joigoose')(Mongoose);


var joiUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required().error(new Error('Email is required!')),
  password: Joi.required().error(new Error('password is required!')),
})

var mongooseUserSchema = new Mongoose.Schema(
  Joigoose.convert(joiUserSchema)
)

module.exports = Mongoose.model('user', mongooseUserSchema)