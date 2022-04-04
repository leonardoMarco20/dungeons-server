const Mongoose = require("mongoose")
const Joi = require('joi')
const Joigoose = require('joigoose')(Mongoose);


var joiRecordSchema = Joi.object({
  name: Joi.string().error(new Error('Name is required!')),
  player: Joi.string().error(new Error('Player is required!')),
  class: Joi.string().error(new Error('Class is required!')),
  level: Joi.number().error(new Error('Level is required!')),
  race: Joi.string().error(new Error('Race is required!')),
  trend: Joi.string().error(new Error('Trend is required!')),
  divinity: Joi.string(),
  size: Joi.string(),
  age: Joi.number().error(new Error('Age is required!')),
  gender: Joi.string().error(new Error('Gender is required!')),
  weight: Joi.string(),
  skin: Joi.string(),
  height: Joi.string(),
  hair: Joi.string(),
  eyes: Joi.string(),

  healPoints: Joi.number().error(new Error('Heal points is required!')),
  armorClass: Joi.number().error(new Error('Armor class is required!')),
  initiative: Joi.number().error(new Error('Initiative class is required!')),
  touch: Joi.number().error(new Error('Touch is required!')),
  flatFooted: Joi.number().error(new Error('Flat-footed is required!')),

  strength: Joi.number().error(new Error('Strength is required!')),
  dexterity: Joi.number().error(new Error('Dexterity is required!')),
  constitution: Joi.number().error(new Error('Constitution is required!')),
  intelligence: Joi.number().error(new Error('Intelligence is required!')),
  wisdom: Joi.number().error(new Error('Wisdom is required!')),
  charisma: Joi.number().error(new Error('Charisma is required!')),

  fortitude: Joi.number().error(new Error('Fortitude is required!')),
  reflex: Joi.number().error(new Error('Reflex is required!')),
  will: Joi.number().error(new Error('Will is required!')),

  spellResistence: Joi.number().error(new Error('Spell resistence is required!')),
  grapple: Joi.number().error(new Error('Grapple is required!')),
  
  weapons: Joi.array(),
  baseAttackBonus: Joi.number().error(new Error('Base attack bonus is required!')),

  equipament: Joi.number().error(new Error('Equipament is required!')),
})

var mongooseRecordSchema = new Mongoose.Schema(
  Joigoose.convert(joiRecordSchema)
)

module.exports = Mongoose.model('record', mongooseRecordSchema)