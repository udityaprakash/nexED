const {client} = require('../database/connections/postgreSQL'); 


const usertype_and_nclass = async (req, res, next) => {
    try{

        let cli = await client();
        let response =await cli.run.query(`select customer.user_type, class.class_id from customer LEFT JOIN class ON class.email = customer.email WHERE customer.email = $1;`,[req.tokendata.email]);
        if(response.rows.length > 0){
            req.usertype = response.rows[0].user_type;
            req.users_total_class = response.rows.length;
            next();
            // res.status(200).json({error:false, message: 'User type and total class found', data: {usertype: req.usertype, total_class: req.users_total_class}});
        }else{
            res.status(404).json({error:true, message: 'No user found with this email address'});
        
        }
    }catch(e){
        console.log(e);
        res.status(500).json({error:true, message: 'Internal Server Error'});
    }

}


const set = {
    usertype_and_nclass
};

module.exports = set;