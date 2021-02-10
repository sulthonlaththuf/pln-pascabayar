const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../config/passport')

const { login, logout } = require('../router/auth')

const {
  addUser, 
  getUsers, 
  getOneUser,
  updateUser, 
  deleteUser 
} = require('../router/user') 

const {
  addJenisTarif,
  getAllJenisTarif,
  getOneJenisTarif,
  updateJenisTarif,
  deleteJenisTarif
} = require('../router/jenisTarif')

const {
  addPenggunaan,
  getAllPenggunaan
} = require('../router/penggunaan')

// Route Auth
router.post('/auth/login', passport.authenticate('local', {session :false}), login)
router.get('/auth/logout', passport.authenticate('jwt', {session :false}), logout)

// Route User
router.post('/admin/register/user',  addUser)
router.get('/admin/get/users', getUsers)
router.get('/admin/get/user/:id', getOneUser)
router.put('/admin/update/user/:id', updateUser)
router.delete('/admin/delete/user/:id', deleteUser)

// Route JenisTarif
router.post('/admin/add/jenisTarif/', addJenisTarif)
router.get('/admin/get/jenisTarif/', getAllJenisTarif)
router.get('/admin/get/jenisTarif/:id', getOneJenisTarif)
router.put('/admin/update/jenisTarif/:id', updateJenisTarif)
router.delete('/admin/delete/jenisTarif/:id', deleteJenisTarif)

// Route Penggunaan
router.post('/officer/add/penggunaan', addPenggunaan)
router.get('/officer/get/penggunaan', getAllPenggunaan)

module.exports = router