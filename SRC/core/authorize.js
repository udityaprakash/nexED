const {client} = require('../../SRC/database/connections/postgreSQL');
var jwt = require('jsonwebtoken');
require('dotenv').config();

let createaccessToken = async (email) => {
    const token = await jwt.sign({email:email}, process.env.JWT_SECRET, {expiresIn: '10d'});
    return token;
};

const signup = async (req, res) => {
    const {userid, profile_url, username, email} = req.body;
    let cli = await client();
    console.log('fsda');
    let response = await cli.run.query(`Insert into customer (user_id,username,profile_url,email) values($1,$2,$3,$4);`,[userid,username,profile_url,email]);
    if(response.rowCount == 1){
        console.log(Date.now());
        const accToken = await jwt.sign({email:email, createdAt:Date.now()}, process.env.JWT_SECRET,{expiresIn: process.env.EXPIRE_IN});
        console.log(accToken);
        res.status(200).json({error:false,tokens:accToken,message: 'User is authorized'});
    }else{
        res.status(502).json({error:true,message: 'server database unreachable'});
    }
};

const generatetoken = async (req,res) => {
    const {email} = req.body;
    let cli = await client();
    let response = await cli.run.query(`Select * from customer where email = $1;`,[email]);
    if(response.rows != 0){
        const accToken = await jwt.sign({email:email, createdAt:Date.now()}, process.env.JWT_SECRET,{expiresIn: process.env.EXPIRE_IN});
        res.status(200).json({error:false,tokens:accToken,message: 'User is refreshed and authorized'});
    }else{
        res.status(200).json({error:true,message: 'Invalid Email for refresh token'});
    }

}





const authhand = {
    signup,
    generatetoken
};

module.exports = authhand;