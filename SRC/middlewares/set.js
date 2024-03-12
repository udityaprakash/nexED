const {client} = require('../database/connections/postgreSQL'); 


const usertype = async (req, res, next) => {
    try{

        let cli = await client();
        let response =await cli.run.query(`select usertype from customer where email=$1`,[req.tokendata.email]);
        if(response.rows.length > 0){
            req.usertype = response.rows[0].usertype;
            next();
        }else{
            res.status(404).json({error:true, message: 'No user found with this email address'});
        
        }
    }catch(e){
        res.status(500).json({error:true, message: 'Internal Server Error'});
    }

}


const set = {
    usertype
};

module.exports = set;