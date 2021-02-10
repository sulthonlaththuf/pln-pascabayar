const User = require('../models/User')
const JenisTarif = require('../models/JenisTarif')
 
module.exports = {
  addUser : async (req, res) => {
    try{
      if(!req.body) 
        res.status(400).json({
          message: {
            msgBody : 'Error has occured.',
            msgError: true
          }
        })
      const {username, password, noMeter, idJenisTarif, role} = req.body
      
      await User.findOne({username}, (err, doc) => {
        if(err)
          res.status(400).json({
            message: {
              msgBody: 'Error has occured.',
              msgError: true
            }
          })
        if(doc)
          res.status(400).json({
            message: {
              msgBody: 'Username already taken.',
              msgError: true
            }
          })
      })
      
      const newUser = new User({
        username,
        password,
        noMeter,
        JenisTarif : await JenisTarif.findOne({_id : idJenisTarif}),
        role
      })

      await newUser.save(err => {
        if(err)
          res.status(400).json({
            message: {
              msgBody: 'Error has occured.',
              msgError: true
            }
          })
        res.status(200).json({
          message : {
            msgBody: "Account added.",
            msgError: false
          }
        })
      })

      
    } catch(err){
      res.status(500).json({err})
    }
  },

  getUsers : async (req, res) => {
    try{
      const users = await User.find().populate('JenisTarif')
      if(!users)
        res.status(400).json({
          message : {
            msgBody: "Error has occured.",
            msgError: true
          }
        })
      res.status(200).json({
        docs : users,
        message : {
          msgBody: "Get all users.",
          msgError: false
        }
      })
    }catch(err){
      res.status(500).json({err})
    }
  },

  getOneUser : async (req, res) => {
    try{
      if(!req.params)
      res.status(400).json({
        message : {
          msgBody: "Error has occured.",
          msgError: true
        }
      })
      const {id} = req.params
      await User.findById(id, (err, doc) => {
        if(err)
        res.status(400).json({
          message : {
            msgBody: "Error has occured.",
            msgError: true
          }
        })
        res.status(200).json({
          doc,
          message : {
            msgBody: "Get one user.",
            msgError: false
          }
        })
      })
    }catch(err){
      res.status(500).json({err})
    }
  },

  updateUser : async(req, res) => {
    if(!req.body && !req.params) 
    res.status(400).json({
      message : {
        msgBody: "Error has occured.",
        msgError: true
      }
    })
    const {username, password, noMeter, jenisTarif, role} = req.body
    
    const {id} = req.params
    const updateData = {
      username,
      password,
      noMeter,
      jenisTarif,
      role
    }

    await User.findByIdAndUpdate(id, updateData, (err, doc) => {
      if(err)
        res.status(400).json({
          message : {
            msgBody: "Error has occured.",
            msgError: true
          }
        })
      
      res.status(200).json({
        message : {
          msgBody: "User Updated",
          msgError: false
        }
      })
    })
  },

  deleteUser : async (req, res) => {
    try{
      if(!req.params)
        res.status(400).json({
          message : {
            msgBody: "Error has occured.",
            msgError: true
          }
        })  
      const {id} = req.params
      await User.findByIdAndRemove(id, (err, doc) => {
        if(err)
          res.status(400).json({
            message : {
              msgBody: "Error has occured.",
              msgError: true
            }
          })
          res.status(200).json({
            message : {
              msgBody: "User Deleted",
              msgError: false
            }
          })
      })
    }catch(err){
      res.status(500).json({err})
    }
  }

}