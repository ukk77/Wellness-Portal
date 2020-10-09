const config = require('config');
const jwt = require('jsonwebtoken');

//this file can be imported in api files to protect private routes i.e when doing router.post('/', (req, res))... instead do
// router.post('/', auth, (req, res)) so the token will always be verified before making any changes to the data


function auth(req, res, next){
    const token = req.header('x-auth-token')
    if (!token){
        res.status(401).json({ msg: "Unauthorized" })
    }

    //verify token
    try{
        //add user from payload/token
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded;
        next();
    }catch (e){
        res.status(400).json(
            { msg: "token invalid" }
        )
    }
    
}

module.exports = auth;