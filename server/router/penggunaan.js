const Penggunaan = require('../models/penggunaan')

module.exports = {
  addPenggunaan : async(req, res) => {
    try{
      if(!req.body)
        res.status(400).json({
          message: {
            msgInfo : "Error has occured.",
            msgError: true
          }
        })
      
      const {
        date, 
        meterAwal,
        meterAkhir
      } = req.body

      const newPenggunaan = new Penggunaan({
        date,
        penggunaanMeter: {
          meterAwal,
          meterAkhir
        }
      })

      await newPenggunaan.save(err => {
        if(err)
          res.status(400).json({
            message: {
              msgInfo : "Error has occured.",
              msgError: true
            }
          })
        res.status(200).json({
          message: {
            msgInfo : "Data added.",
            msgError: false
          }
        })
      })
    }catch(err){
      res.status(500).json({err})
    }
  },

  getAllPenggunaan : async (req, res) => {
    try{
      await Penggunaan.find((err, docs) => {
        if(err)
          res.status(400).json({
            message: {
              msgInfo : "Error has occured.",
              msgError: true
            }
          })
        res.status(200).json({
          docs,
          message: {
            msgInfo : "Get all penggunaan.",
            msgError: false
          }
        })
      })
    }catch(err){
      res.status(500).json({err})
    }
  }



}