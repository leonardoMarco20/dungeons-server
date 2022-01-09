const mongoose = require("mongoose")

const Record = mongoose.model('record', {
  name: String,
  surname: String,
})

module.exports = Record