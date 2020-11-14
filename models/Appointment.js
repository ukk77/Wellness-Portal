const mongoose = require('mongoose');

//Appointment model for the mongo atlas db/the format for storing the appointment in the mongo collection
const AppointmentSchema = new mongoose.Schema({
    patientName: { 
        type: String,
        required:true
    },

    bookingDate: {
        type: String,
        required:true
    },

    doctorName: {
        type: String,
        required:true
    }
});

module.exports = Appointment = mongoose.model('Appointment', AppointmentSchema)