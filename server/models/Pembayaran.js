const mongoose = require('mongoose')
const {Schema, model} = mongoose

const PembayaranSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  bulanBayar: {
    type: Date,
    required: true
  },
  biayaAdmin: {
    type: Number,
    default: 2500
  },
  buktiBayar: {
    type: String,
    required: true
  },
  statusBayar:{
    type: String,
    required: 'true',
    enum: ['not yet', 'done']
  },
  User: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
  {timestamps : true}
)

module.exports = model('Pembayaran', PembayaranSchema)
