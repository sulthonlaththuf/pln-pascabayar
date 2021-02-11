const mongoose = require('mongoose')

const PenggunaanSchema = new mongoose.Schema({
  date : {
    type: Date,
    required: true
  },
  penggunaanMeter : {
    meterAwal: {
      type: Number,
      required: true
    },
    meterAkhir: {
      type: Number,
      required: true
    }
  },
  User: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model("Penggunaan", PenggunaanSchema)

