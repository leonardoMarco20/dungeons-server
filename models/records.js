const Mongoose = require("mongoose")
const Joi = require('joi')
const Joigoose = require('joigoose')(Mongoose);


var joiRecordSchema = Joi.object({
  name: Joi.string().required().error(new Error('Name is required!')),
  player: Joi.string().required().error(new Error('Player is required!')),
  class: Joi.string().required().error(new Error('Class is required!')),
  level: Joi.number().required().error(new Error('Level is required!')),
  race: Joi.string().required().error(new Error('Race is required!')),
  trend: Joi.string().required().error(new Error('Trend is required!')),
  divinity: Joi.string(),
  size: Joi.string(),
  age: Joi.number().required().error(new Error('Age is required!')),
  sex: Joi.string().required().error(new Error('Sex is required!')),
  weight: Joi.string(),

  healPoints: Joi.number().required().error(new Error('Heal points is required!')),
  armorClass: Joi.number().required().error(new Error('Armor class is required!')),
  initiative: Joi.number().required().error(new Error('Initiative class is required!')),
  touch: Joi.number().required().error(new Error('Touch is required!')),
  flatFooted: Joi.number().required().error(new Error('Flat-footed is required!')),

  strength: Joi.number().required().error(new Error('Strength is required!')),
  dexterity: Joi.number().required().error(new Error('Dexterity is required!')),
  constitution: Joi.number().required().error(new Error('Constitution is required!')),
  intelligence: Joi.number().required().error(new Error('Intelligence is required!')),
  wisdom: Joi.number().required().error(new Error('Wisdom is required!')),
  charisma: Joi.number().required().error(new Error('Charisma is required!')),

  fortitude: Joi.number().required().error(new Error('Fortitude is required!')),
  reflex: Joi.number().required().error(new Error('Reflex is required!')),
  will: Joi.number().required().error(new Error('Will is required!')),

  spellResistence: Joi.number().required().error(new Error('Spell resistence is required!')),
  grapple: Joi.number().required().error(new Error('Grapple is required!')),
  
  weapons: Joi.number(),

  equipament: Joi.number().required().error(new Error('Equipament is required!')),
})

var mongooseRecordSchema = new Mongoose.Schema(
  Joigoose.convert(joiRecordSchema)
)

module.exports = Mongoose.model('record', mongooseRecordSchema)