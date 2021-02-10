const JWT = require('jsonwebtoken')

const signToken = (userID) => {
  return JWT.sign({
    iss: "sitiHambalang",
    sub: userID
  }, 'sitiHambalang', {expiresIn : "1h"})
}

module.exports = {
  login : async (req, res) => {
    try{
      if(req.isAuthenticated()){
        const {_id, username, role} = req.user
        const token = signToken(_id)
        res.cookie('access_token', token, {httpOnly:true, sameSite: true})
        res.status(200).json({isAuthenticated: true, user: {username, role} })
      }
    } catch(err){
      res.status(500).json({err})
    }

  },

  logout: async(req, res) => {
    try{
      res.clearCookie('access_token')
      res.status(200).json({
        user: {
          username: "",
          role: ""
        },
        message : {
          msgInfo: "Logout success",
          msgError: false
        }
      })
    }catch(err){
      res.status(500).json({err})
    }
  }
}