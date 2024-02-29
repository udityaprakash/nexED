const {QueryExecuter} = require('../../SRC/database/connections/postgreSQL');
var jwt = require('jsonwebtoken');
var {query} = require('../database/query/insert');
require('dotenv').config();

let createaccessToken = async (email) => {
    const token =await jwt.sign({email:email}, process.env.JWT_SECRET, {expiresIn: '10d'});
    return token;
};

const signup = async (req, res) => {
    const {userid, profile_url, username, email} = req.body;
    let response = await QueryExecuter(query.insert_user(userid,username,profile_url,email));
    if(!response.error){
        console.log(response.data);
        const accToken = createaccessToken(email);
        console.log(accToken);
        res.status(200).json({error:false,tokens:accToken,message: 'User is authorized'});
    }else{
        res.status(502).json({error:true,message: 'server database unreachable'});
    }
};






const authhand = {
    signup,
};

module.exports = authhand;