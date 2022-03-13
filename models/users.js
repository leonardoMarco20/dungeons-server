const Mongoose = require("mongoose")
const Joi = require('joi')
const Joigoose = require('joigoose')(Mongoose);

const bcrypt = require('bcryptjs')

const joiUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required().email().messages({
    'string.empty': 'Cannot be empty',
    'number.base': 'Must be a number',
    'any.invalid': 'Value not valid',
    'domain.invalid': 'Domain not valid',
    'email.invalid': 'Email not valid',
    'phoneNumber.invalid': 'Phone Number not valid',
    'array.unique': 'contains a duplicate value',
    'custom.max11char': 'Maximum 11 alphanumeric characters. Start with a letter'
  }),
  password: Joi.required(),
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