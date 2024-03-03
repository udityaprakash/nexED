const { v4: uuidv4 } = require('uuid');
const bannerdb = require('../database/schema/banner');
const {client} = require('../database/connections/postgreSQL');

const createClass =async (req, res)=>{
    try{
        const {classname, subject,section,description } = req.body;

        console.log(req.tokendata.email);
        // console.log(req.body.classname, req.body.subject, req.body.section, req.body.description, req.tokendata.email);
        let classid = uuidv4();
        let result =await bannerdb.find({}, { projection: { _id: 1 } });
        const ids = result.map(doc => doc._id);
        
        if(ids.length < 5) res.status(200).json({error:true, message:"not enough banners to create class, please add more banners to the database"});
        
        const bannerid = ids[Math.floor(Math.random() * ids.length)];
        console.log(bannerid);
        let cli = await client();
        let response = await cli.run.query(`Insert into class (class_id,class_name, subject, section, description, email, banner_id) values($1,$2,$3,$4,$5,$6,$7);`,[
            classid,
            classname,
            subject ? subject : '',
            section ? section : '',
            description ? description : '',
            req.tokendata.email,
            bannerid
        ]);
        console.log(response);
        res.status(200).json({error:false, message:"class created successfully"});

    }catch(e){
        console.log(e);
        res.status(500).json({error:true, message:"internal server error"});
    }
};

const updateClass = (req, res)=>{

};

module.exports = {createClass, updateClass}