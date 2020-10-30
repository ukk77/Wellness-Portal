const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const passport = require('passport')
const passpoftConfig = require('../passport')
const Appointment = require('../models/Appointment')
const User  = require('../models/User')
const jwtx = require('jsonwebtoken')
const jwtSecret = config.get('jwtSecret');
const cookieParser = require('cookie-parser');
const appointmentRouter = express.Router();


appointmentRouter.use(cookieParser())

//route to handle booking appointments by a patient
appointmentRouter.post('/bookanappointment', passport.authenticate('jwt', {session : false }), (req, res) => {
    const { patientName, bookingDate, doctorName } = req.body;
    const newAppointment = new Appointment({ patientName, bookingDate, doctorName });
    newAppointment.save( err => {
        if (err){
            return res.status(500).json({ message : { msgBody : err + " Error has occured", msgError : true } })
        }
        else{
            return res.status(201).json({ message : { msgBody : "Appointment successfully created", msgError : false } })
        }
    })
})

module.exports = appointmentRouter;