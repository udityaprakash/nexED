const {client} = require('../../database/connections/postgreSQL');
const executeQuery = async (req,res) => {
    if(req.body.query){
        try{
            const query = req.body.query;
            console.log(query);
            var cli = await client();
            const result = await cli.run.query(query);
            res.status(200).json({error:false,data:result, msg: 'Query executed successfully',});
        }catch(error){
            res.status(500).json({error:true, err:error, msg: 'Internal server error', });
        }
    }else{
        res.status(400).json({error:true, msg: 'No query found' });
    }
};

module.exports = {executeQuery};