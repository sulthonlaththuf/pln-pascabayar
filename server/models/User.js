const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		min: 6
	},
	password: {
		type: String,
		required: true,
		min: 6
	},
	noMeter: {
		type: Number,
		required: true
	},
	role: {
		type: String,
		enum: ['admin', 'officer', 'user'],
		required: 'true'
	},
	JenisTarif: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "JenisTarif"
	}
},
	{
		timestamps: true
	}
)

UserSchema.pre('save', function(next) {
	if(!this.isModified('password')) return next()
	bcrypt.hash(this.password, 10, (err, password) => {
		if(err) return next(err)
		this.password = password
		next()
	})        
})

UserSchema.methods.comparePassword = function(password, cb) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		if(err) 
			return cb(err)
		else {
			if(!isMatch) 
				return cb(null, isMatch)
			return cb(null, this)
		}
	})
}

module.exports = mongoose.model('User', UserSchema)
