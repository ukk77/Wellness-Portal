const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

//User model for the mongo atlas db/the format for storing the user in the mongo collection
const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        unique:true,
        required:true
    },
    
    password: { 
        type: String,
        required: true
    },

    firstName: { 
        type: String,
        required: true
    },

    lastName: { 
        type: String,
        required: true
    },

    dateOfBirth: { 
        type: String,
        required: true
    },

    role: {
        type: String
    },
    
    information: {
        gender: {
            type: String
        },

        age: {
            type: Number
        },

        blood_type: {
            type: String
        }
    },

    bookings: {
        type: Array
    },

    access_to: {
        type: Array
    }
});

//function that should run before a user is added to the mongo collection
//generates salt and encrypts password using bcryptjs
UserSchema.pre('save', function (next){
    if(!this.isModified('password')){
        return next();
    }
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if(err){
            return next(err)
        }
        this.password  = passwordHash
        next();
    })

})

//function to compare the password entered by the user to the encrypted copy in the mongo collection
UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err,isMatch) => {
        if(err){
            return cb(err)
        }
        else{
            if(!isMatch){
                return cb(null, isMatch)
            }
            return cb(null, this)
        }
    })
}

module.exports = User = mongoose.model('User', UserSchema)