const {client} = require("../../database/connections/postgreSQL");

const ficherview =async (req,res,next) => {
    const classid = req.body.classid;
    const cli =await client();
    const response =await cli.run.query(`Select * from ficher JOIN class on ficher.class_id = enrollment.class_id where class_id = $1`,[classid]);
    if(response.rows.length > 0){

    }else{
        const response2 =await cli.run.query(`Select * from ficher LEFT JOIN class on ficher.class_id = class.class_id where class_id = $1`,[classid]);
    }

    
}

module.exports = {ficherview}