const {client} = require('../database/connections/postgreSQL'); 
const isclasscreater =async (req, res, next) => {
    try{

        let cli = await client();
        let response =await cli.run.query(`select * from class where email=$1 and class_id=$2`,[req.tokendata.email, req.body.classid]);
        if(response.rows.length > 0){
            next();
        }else{
            res.status(401).json({error:true, message: 'Unauthorized Access for Class Content Creation'});
        
        }
    }catch(e){
        res.status(500).json({error:true, message: 'Internal Server Error'});
    }
};

const isstudentjoined = async (req, res, next) => {
    try{

        let cli = await client();
        let response =await cli.run.query(`SELECT  ficher.title, enrollment.email FROM ficher INNER JOIN enrollment ON ficher.class_id = enrollment.class_id WHERE enrollment.email = $1;`,[req.tokendata.email]);
        if(response.rows.length > 0){
            next();
        }else{
            res.status(401).json({error:true, message: 'Unauthorized Access for Class Content Creation'});
        
        }
    }catch(e){
        res.status(500).json({error:true, message: 'Internal Server Error'});
    }
};

const check = {
    isclasscreater,
    isstudentjoined
};

module.exports = check;