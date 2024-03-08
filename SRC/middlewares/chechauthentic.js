const {client} = require('../database/connections/postgreSQL'); 
const authenticity =async (req, res, next) => {

    let cli = await client();
    let response =await cli.run.query(`select * from class where email=$1 and class_id=$2`,[req.tokendata.email, req.body.classid]);
    if(response.rows.length > 0){
        next();
    }else{
        res.status(401).json({error:true, message: 'Unauthorized Access for Class Content Creation'});
    
    }
};

const check = {
    authenticity
};

module.exports = check;