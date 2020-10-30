const mongoose = require('mongoose');

//doctor model for the mongo atlas db/the format for storing the doctor in the mongo collection
const DoctorSchema = new mongoose.Schema({
    name: { 
        type:String,
        required:true
    },
    
    speciality: { 
        type:String,
        required: true
    },

    workingDays : {
        type:String,
        required: true
    },

    qualification : {
        type:String
    },

    experience : {
        type:String
    }

});


module.exports = Doctor = mongoose.model('doctor', DoctorSchema)