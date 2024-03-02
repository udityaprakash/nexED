require('dotenv').config();
const admin = (req, res, next) => {
    if(req.headers.adminkey == process.env.ADMIN_KEY){
        next();
    }else{
        res.status(401).json({error:true, message: 'Unauthorized access to admin routes'});
    }
};

module.exports = admin;