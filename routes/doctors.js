const express = require('express');
const doctorsRouter = express.Router();
const Doctor = require('../models/Doctor')

//route for handling search doctors
doctorsRouter.post('/searchdoctors', (req, res) => {
    let  doctor_type = req.body.doctorType;
    Doctor.find({ speciality : doctor_type }, function(err, results) {
        if(err) {
            return res.status(500).json({ message : { msgBody : " Error has occured", msgError : true } })
        }
        else {
            // console.log(res.json())
            return res.status(201).json({ message : { msgBody : results, msgError : false } })
        }
    })

})

//route to handle adding doctors to the mongo collection
doctorsRouter.get('/adddoctors', (req, res) => {
    const { name, speciality, workingDays, qualification, experience } = req.body;
    const newDoctor = new Doctor({ name, speciality, workingDays, qualification, experience })
    newDoctor.save(err => {
        if (err){
            return res.status(500).json({ message : { msgBody : err + " Error has occured", msgError : true } })
        }
        else{
            return res.status(201).json({ message : { msgBody : "Doctor successfully added", msgError : false } })
        }
    })

})


module.exports = doctorsRouter;