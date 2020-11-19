const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const passport = require('passport')
const passpoftConfig = require('../passport')
const User = require('../models/User')
const jwtx = require('jsonwebtoken')
const userRouter = express.Router();
const jwtSecret = config.get('jwtSecret');

const cookieParser = require('cookie-parser');

userRouter.use(cookieParser())

const signToken = userId => {
    // can return any data but sensitive data in token
    return jwtx.sign({
        iss : "medic",
        sub : userId
    }, jwtSecret, {expiresIn : "1h"})
}

// route for user registeration to be processed
userRouter.post('/register', (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    User.findOne({username}, (err, user) => {
        if (err) {
            return res.status(500).json({ message : { msgBody : "Error has occured", msgError : true } })
        }
        if (user) {
            return res.status(400).json({ message : { msgBody : "Username is already taken", msgError : true } })
        }
        else {
            let [month, date, year]    = new Date().toLocaleDateString("en-US").split("/")
            let dateOfBirth = "" + month.toString() + "-" + date.toString() + "-" + year.toString(); 
            console.log(dateOfBirth)
            let role = "Patient";
            let information = { gender:"", age:00, blood_type: "" }
            let bookings = []
            let access_to = []
            const newUser = new User({ username, password, firstName, lastName, dateOfBirth, role, information, bookings, access_to });
            newUser.save( err => {
                if (err){
                    return res.status(500).json({ message : { msgBody : err + " Error has occured", msgError : true } })
                }
                else{
                    return res.status(201).json({ message : { msgBody : "Account successfully created", msgError : false } })
                }
            })
        }
    })
})

// route for user login to be processed
// session : false means that the session is not to be maintained by the server
/* httponly : true means that on the client side the client cannot touch the cookie using javascript, 
 done to prevent cross site scripting */
/* samesite : true is to prevent against cross site forgery attacks */
userRouter.post('/login', passport.authenticate('local', {session : false }), (req, res) => {
    if(req.isAuthenticated()){
        const {_id, username, firstName, lastName, dateOfBirth, role, bookings, access_to, information} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly:true, sameSite:true});
        res.status(200).json({ isAuthenticated : true, user : {username, firstName, lastName, dateOfBirth, role, bookings, access_to, information}})
    }
})


//route to handle logout
userRouter.get('/logout', passport.authenticate('jwt', {session : false }), (req, res) => {
    // req.logout();
    res.clearCookie('access_token');
    res.json({user: {username : "", firstName : "", lastName : "", dateOfBirth : "", role : "", bookings : [], access_to : [], information : 
        { gender : "", age : 0, blood_type : "" }}, success : true})
})


// userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
//     if(req.user.role === 'admin'){
//         res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
//     }
//     else
//         res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
// });

//route to keep front end and back end synced 
userRouter.get('/authenticated', passport.authenticate('jwt', {session : false }), (req, res) => {
    const {username, firstName, lastName, dateOfBirth, role, bookings, access_to, information} = req.user;
    res.status(200).json({ isAuthenticated: true, user : { username, firstName, lastName, dateOfBirth, role, bookings, access_to, information }})
})


//Route to handle user profile updates
userRouter.post('/updateprofile', passport.authenticate('jwt', {session : false }), (req, res) => {
    const {username, firstName, lastName, dateOfBirth, role, bookings, access_to, information} = req.body;
    User.updateOne({ username : username }, { firstName : firstName, lastName : lastName, dateOfBirth : dateOfBirth, information : information }, function (err, result){
        if (err){
            return res.status(500).json({ message : { msgBody : err + " Error has occured", msgError : true } })
        }
        else{
            return res.status(201).json({ message : { msgBody : "Updated", msgError : false } })
        }
    })
})


//route to handle a role update(only accessible via postman client)
userRouter.post('/updaterole', passport.authenticate('jwt', {session : false }), (req, res) => {
    const {username, firstName, lastName, dateOfBirth, role, bookings, access_to, information} = req.body;
    User.updateOne({ username : username }, { role : role }, function (err, result){
        if (err){
            return res.status(500).json({ message : { msgBody : err + " Error has occured", msgError : true } })
        }
        else{
            return res.status(201).json({ message : { msgBody : "Updated", msgError : false } })
        }
    })
})

//route to handle appointment bookings by the user
userRouter.post('/updatebookings', passport.authenticate('jwt', {session : false }), (req, res) => {
    const {username, bookings} = req.body;
    User.updateOne({ username : username }, { $addToSet : { bookings : bookings } }, function (err, result){
        if (err){
            return res.status(500).json({ message : { msgBody : err + " Error has occured", msgError : true } })
        }
        else{
            return res.status(201).json({ message : { msgBody : "Updated", msgError : false } })
        }
    })
})

//route to handle requests that update a doctor's access to a patients data when an appointment is booked
userRouter.post('/updateaccessto', passport.authenticate('jwt', {session : false }), (req, res) => {
    const {username, firstName, lastName, dateOfBirth, role, bookings, access_to, information} = req.body;
    User.updateOne({ username : username }, { $addToSet : { access_to : access_to } }, function (err, result){
        if (err){
            return res.status(500).json({ message : { msgBody : err + " Error has occured", msgError : true } })
        }
        else{
            return res.status(201).json({ message : { msgBody : "Updated", msgError : false } })
        }
    })
})

//route to handle requests that fetch for a user's id
userRouter.post('/getUserId', passport.authenticate('jwt', {session : false }), (req, res) => {
    const { username } = req.body;
    User.findOne({username}, (err, user) => {
        if (err) {
            // console.log(err)
            return res.status(500).json({ message : { msgBody : "Error has occured", msgError : true } })
        }
        else {
            const _id = user._id
            return res.status(201).json({ user : { _id, username } })
        }
    })
})

//route to handle requests that try to fetch a user's info
userRouter.post('/getUserInfo', passport.authenticate('jwt', {session : false }), (req, res) => {
    const { username } = req.body;
    User.findOne({username}, (err, user) => {
        if (err) {
            return res.status(500).json({ message : { msgBody : "Error has occured", msgError : true } })
        }
        else {
            const info = user.information
            const firstName = user.firstName
            const lastName = user.lastName
            const dateOfBirth = user.dateOfBirth
            const bookings = user.bookings
            return res.status(201).json({ user : { username, firstName, lastName, dateOfBirth, bookings, info } })
        }
    })
})

module.exports = userRouter;