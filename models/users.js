const Mongoose = require("mongoose")
const Joi = require('joi')
const Joigoose = require('joigoose')(Mongoose);

const bcrypt = require('bcryptjs')

const joiUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  confirmPassword: Joi.string(),
  color: Joi.object().required()
})

const mongooseUserSchema = new Mongoose.Schema(
  Joigoose.convert(joiUserSchema)
)


mongooseUserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

module.exports = Mongoose.model('User', mongooseUserSchema)