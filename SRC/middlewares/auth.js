const jwt = require('jsonwebtoken');
const { refreshUser } = require('../core/authorize');
require('dotenv').config();
async function verify(token){
        var splitetoken = token.split(' ')[1];
        var data;
        await jwt.verify(splitetoken, process.env.JWT_SECRET, (err, authData) => {
            if(err){
                if (err.name === 'TokenExpiredError') {
                    console.log('here:  ',err.name);
                    data = {error:true,in:'tokenex', message: 'Token has expired'};
                  } else {
                    data = {error:true,in:'else', message: 'Invalid token'};
                  }
            }else{
                data = {error:false, data:authData, message:'Access Token is Active & can be used'};
            }
        });
        return data;
}

let verifytoken =async (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        let acc_res =await verify(bearerHeader);
        if(acc_res.error){
            if(acc_res.in === 'tokenex'){
                        res.status(401).json({error:true, re_login_required:true, message: acc_res.message});
    
            }else{
                res.status(401).json({error:true, re_login_required:true, message: acc_res.message});
            }
        }else{
            req.tokendata = acc_res.data;
            next();
        }
};

let isTokenexp =async (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        let acc_res = await verify(bearerHeader);
        // console.log(acc_res);
        if(acc_res.error){
            if(acc_res.in === 'tokenex'){
                        next();
            }else{
                res.status(401).json({error:true, message: 'Invalid Authorization token Supplied'});
            }
        }else{
            res.status(200).json({error:false, message: 'Token is Active & can be used'});
        }
}
module.exports = {verifytoken, isTokenexp};