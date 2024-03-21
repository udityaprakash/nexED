const {client} = require('../../database/connections/postgreSQL');
const teaching_view = async (req, res)=>{
    try{

        const cli =await client();
        const response =await cli.run.query(`Select * from class where email=$1`, [ req.tokendata.email ]);
        // console.log(response);
        res.json({
            error:false,
            response:response.rows,
            message:"Successfully Teaching courses found"
        });
    }catch(e){
        res.json({
            error:true,
            message:"Internal Server Error",
            err:e
        })
    }

}

const joined_view =async (req, res)=>{
    try{

        const cli =await client();
        const response =await cli.run.query(`Select * from enrollment LEFT JOIN class on enrollment.class_id = class.class_id where enrollment.email=$1`, [ req.tokendata.email ]);
        // console.log(response);
        res.json({
            error:false,
            response:response.rows,
            message:"Successfully found joined courses"
        });
    }catch(e){
        res.json({
            error:true,
            message:"Internal Server Error",
            err:e
        });
    }

}

module.exports = {teaching_view, joined_view}