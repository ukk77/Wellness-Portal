const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken')

const User = require('../../models/User');

router.post('/', async (req, res) => {
    
    const { username, email, password } = req.body;

    if (!username || !password || !email){
        return res.status(400).json({ msg: "Please enter all details" })
    }

    User.findOne({ email })
    .then(user => {
        if (user){
            return res.status(400).json({ msg: "User already exists" })
        }

        const newUser = new User({
            username,
            email,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                newUser.password = hash;
                newUser.save().
                then(user => {

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        {expiresIn: 3600}, 
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email
                                }
                            })
                        }
                    ) 
                });
            })
        })
    })

    
    // const newUser = new User({
    //     username: req.body.username,
    //     password: req.body.password
    // })

    // newUser.save().then(user = res.json(newUser))

})


module.exports = router;