const mongoose = require('mongoose')

const JenisTarifSchema = new mongoose.Schema({
  golonganTarifListrik: {
    type: String,
    required: true
  },
  daya: {
    from: {
      type: Number,
      required: true
    },
    to: {
      type: Number,
      required: true
    }
  },
  biayaPemakaian: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('JenisTarif', JenisTarifSchema)



