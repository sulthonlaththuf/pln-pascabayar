const JenisTarif = require('../models/JenisTarif')

module.exports = {
  addJenisTarif : async (req, res) => {
    try{
      if(!req.body)
        res.status(400).json({
          msg: "failed to add.",
          msgInfo: false
        })
      
      const {golonganTarifListrik, daya, biayaPemakaian} = req.body
      const newJenisTarif = new JenisTarif({
        golonganTarifListrik,
        daya,
        biayaPemakaian
      })
  
      await newJenisTarif.save()

      res.status(200).json({
        msg: "data added.",
        msgInfo: true
      })

    }catch(err){
      res.status(400).json({err})
    }
  },

  getAllJenisTarif : async (req, res) => {
    try{
      await JenisTarif.find((err, docs) => {
        if(err)
          res.status(400).json({
            msg: err,
            msgInfo: false
          })
        res.status(200).json({
          docs,
          msgInfo: true
        })
      })
    }catch(err){
      res.status(400).json({err})
    }
  },

  getOneJenisTarif : async (req, res) => {
    try{
      if(!req.params)
        res.status(400).json({
          msg: "Data is not found Or There is no Data.",
          msgInfo: false
        })

      const {id} = req.params
      
      await JenisTarif.findById(id, (err, doc) => {
        if(err)
          res.status(400).json({
            msg: err,
            msgInfo: false
          })
        res.status(200).json({
          doc,
          msgInfo: true
        })
      })
    }catch(err){
      res.status(400).json({err})
    }
  },

  updateJenisTarif : async (req, res) => {
    try{
      if(!req.body && !req.params)
        res.status(400).json({
          msg: "failed to update.",
          msgInfo: false
        })
      
      const {id} = req.params
      const {golonganTarifListrik, daya, biayaPemakaian} = req.body
      const updateData = {
        golonganTarifListrik,
        daya,
        biayaPemakaian
      }

      await JenisTarif.findByIdAndUpdate(id, updateData)
    }catch(err){
      res.status(400).json({err})
    }
  },

  deleteJenisTarif : async (req, res) => {
    try{
      if(!req.params) 
        res.status(400).json({
          msg: 'failed to delete.',
          msgInfo: false
        })

      const {id} = req.params

      await JenisTarif.findByIdAndRemove(id, (err, doc) => {
        if(err)
          res.status(400).json({
            msg : "lalalal",
            msgStatus: false
          })
        res.status(200).json({
          msg: "Jenis Tarif Deleted",
          msgInfo: true
        })
      })
    }catch(err){
      res.status(400).json({err})
    }
  }
}

