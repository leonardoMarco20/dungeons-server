const Mongoose = require("mongoose")
const Joi = require('joi')
const Joigoose = require('joigoose')(Mongoose);

const bcrypt = require('bcryptjs')

const joiUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(), //Joi.string().required().error(new Error('Email is required!')),
  password:Joi.string(), //Joi.required().error(new Error('password is required!')),
})

const mongooseUserSchema = new Mongoose.Schema(
  Joigoose.convert(joiUserSchema)
)

mongooseUserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

module.exports = Mongoose.model('user', mongooseUserSchema)