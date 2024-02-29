const pool = require('../database/connections/postgreSQL');
var jwt = require('jsonwebtoken');
var query = require('../database/query/insert');
require('dotenv').config();

let createaccessToken = async (email) => {
    const token =await jwt.sign({email:email}, process.env.JWT_SECRET, {expiresIn: '10m'});
    return token;
};

let createrefreshToken = async (email) => {
    const token =await jwt.sign({email:email}, process.env.JWT_SECRET, {expiresIn: '30d'});
    return token;
};

const signup = (req, res) => {
    const {userid, profile_url, username, email} = req.body;
    const response = pool.query(query.insert_user(userid,username,profile_url,email));
    if(response!=1){
        const accToken = createaccessToken(email);
        const refToken = createrefreshToken(email);
        res.status(200).json({error:false,tokens:{access:accToken,refresh:refToken},message: 'User is authorized'});
    }else{
        res.status(502).json({error:true,message: 'server database unreachable'});
    }
};






const authhand = {
    signup,
};

module.exports = authhand;