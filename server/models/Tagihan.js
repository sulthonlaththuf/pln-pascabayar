const mongoose = require('mongoose')
const {Schema, model} = mongoose

const TagihanSchema = new Schema({
  date : {
    type: Date,
    required: true
  },
  jumlahMeter: {
    type: Number,
    required: true
  },
  jumlahTagihan: {
    type: Number,
    required: true
  },
  User: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = model('Tagihan', TagihanSchema)