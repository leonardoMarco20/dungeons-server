const Mongoose = require("mongoose")
const Joi = require('joi')
const Joigoose = require('joigoose')(Mongoose);


var joiRecordSchema = Joi.object({
  name: Joi.string().required().error(new Error('Name is required!')),
  surname: Joi.string().required().error(new Error('Surname is required!'))
})

var mongooseRecordSchema = new Mongoose.Schema(
  Joigoose.convert(joiRecordSchema)
)

module.exports = Mongoose.model('record', mongooseRecordSchema)