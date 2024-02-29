const jwt = require('jsonwebtoken');
require('dotenv').config();
function verify(token){
        var token = token.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if(err){
                if (err.name === 'TokenExpiredError') {
                    return {error:true,in:'tokenex', message: 'Token has expired'};
                  } else {
                    return {error:true,in:'else', message: 'Invalid token'};
                  }
            }else{
                return {error:false,data:authData};
            }
        });

}

let verifytoken =async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const refreshHeader = req.headers['refresh'];
    if(typeof bearerHeader !== 'undefined' && typeof refreshHeader !== 'undefined'){
        let acc_res = verify(bearerHeader);
        if(acc_res.error){
            if(acc_res.in === 'tokenex'){
                let ref_res = verify(refreshHeader);
                if(ref_res.error){
                        res.status(401).json({error:true,re_login_required:true,message: acc_res.message});

                }else{
                    req.tokendata = ref_res.data;
                    req.new_access_token =await jwt.sign({email:ref_res.data.email}, process.env.JWT_SECRET, {expiresIn: '10m'});
                    next();
                }
    
            }else{
                res.status(401).json({error:true,message: acc_res.message});
            }
        }else{
            req.tokendata = acc_res.data;
            next();
        }
    }else{
        res.status(401).json({error:true,message: 'Bearer Token missing'});
    }
};

module.exports = verifytoken;