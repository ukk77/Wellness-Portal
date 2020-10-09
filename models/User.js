const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type:String,
    },
    
    password: { 
        type:String,
        required: true
    },

    email: { 
        type:String,
        required: true,
        unique: true 
    }
});

module.exports = User = mongoose.model('user', UserSchema)