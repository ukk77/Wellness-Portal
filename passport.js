const passport = require('passport');
const config = require('config');
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');
const jwtSecret = config.get('jwtSecret');

//Allows the backend to extract the cookie from the request
const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies){
        token = req.cookies["access_token"]
        // console.log(token)
    }
    return token
}

//Allow the system to validate/authenticate a client using the jwt token on the client's system
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : jwtSecret
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if (err) {
            return done(err, false)
        }
        if (user) {
            return done(null, user)
        }
        else {
            return done(null, false)
        }
    })
}))


//Allows client authentication via a username and a password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        if (err) {
            return done(err)
        }
        if (!user) {
            return done(null, false)
        }
        user.comparePassword(password, done);
    })
}))