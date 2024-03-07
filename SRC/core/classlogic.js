const { v4: uuidv4 } = require('uuid');
const bannerdb = require('../database/schema/banner');
const {client} = require('../database/connections/postgreSQL');

function classcodegenerator(){
    let code = '';

  for (let i = 0; i < 7; i++) {
    const randomCharCode = Math.floor(Math.random() * 26) + 97;
    const randomChar = String.fromCharCode(randomCharCode);
    code += randomChar;
  }

  return code;
}

const createClass =async (req, res)=>{
    try{
        const {classname, subject,section,description } = req.body;

        console.log(req.tokendata.email);
        // console.log(req.body.classname, req.body.subject, req.body.section, req.body.description, req.tokendata.email);
        let classid = uuidv4();
        let result =await bannerdb.find({}, { projection: { _id: 1 } });
        const ids = result.map(doc => doc._id);

        if(ids.length < 5) res.status(200).json({error:true, message:"not enough banners to create class, please add more banners to the database"});
        
        const classcode = classcodegenerator();

        const bannerid = ids[Math.floor(Math.random() * ids.length)];

        let cli = await client();
        let response = await cli.run.query(`Insert into class (class_id,class_name, subject, section, description, email, banner_id, join_code) values($1,$2,$3,$4,$5,$6,$7,$8);`,[
            classid,
            classname,
            subject ? subject : '',
            section ? section : '',
            description ? description : '',
            req.tokendata.email,
            bannerid.toString(),
            classcode
        ]);
        if(response.error) res.status(500).json({error:true, message:"Some Internal Server Error"});
        res.status(200).json({error:false, message:"class created successfully"});

    }catch(e){
        console.log(e);
        res.status(500).json({error:true, message:"internal server error"});
    }
};

const updateClass =async (req, res)=>{
    try{
        const {classid, classname, subject, section, description} = req.body;
        let cli = await client();
        let response =await cli.run.query(`update class set class_name=$1, subject=$2, section=$3, description=$4 where class_id=$5 and email=$6`,[
            classname,
            subject,
            section ? section : '',
            description ? description : '',
            classid,
            req.tokendata.email
        ]);
        if(response.error) {
            res.status(500).json({error:true, response:response, message:"Some Internal Server Error"});
        }else{

            if(response.rowCount != 0) {
                res.status(200).json({error:false, response:response, message:"class updated successfully"});
            }else{
                res.status(400).json({error:true, response:response, message:"class not found"});
    
            }

        }

    }catch(e){
        res.status(500).json({error:true,err:e, message:"internal server error"});
    }

};

const classdetatils =async (req, res)=>{
    try{
        const {classid} = req.body;
        let cli = await client();
        let response =await cli.run.query(`select * from class where class_id=$1`,[classid]);
        if(response.error) {
            res.status(500).json({error:true, message:"Some Internal Server Error"});
        }
        res.status(200).json({error:false, response:response.rows[0], message:"class details fetched successfully"});
    }catch(e){
        res.status(500).json({error:true, response:e, message:"internal server error"});
    
    }
}

const enroll = async(req, res)=>{
    try{
        const { join_code } = req.body;
        const email = req.tokendata.email;
        if(join_code.length != 7){
            res.status(400).json({error:true, message:"Invalid join code"});
        }else{

            let cli = await client();
            let response1 =await cli.run.query(`select * from class where join_code = $1`,[join_code]);
    
            if (response1.error) {
    
                res.status(500).json({error:true, message:"Some Internal Server Error"});
            }else if(response1.rowCount == 0){
    
                res.status(400).json({error:true, message:"No class found with this join code"});
            }else{
                if(response1.rows[0].email == email){
                    res.status(400).json({error:true, message:"You cannot enroll in your own class"});
                }else{
                    let response2 =await cli.run.query(`select * from enrollment where email = $1 and class_id = $2`,[email, response1.rows[0].class_id]);
                    
                    if(response2.error) {
                        res.status(500).json({error:true, message:"Some Internal Server Error"});
                    }else if(response2.rowCount != 0){
                        res.status(400).json({error:true, message:"You are already enrolled in this class"});
                    }else{
                        let response3 =await cli.run.query(`Insert into enrollment (class_id, email) values($1,$2)`,[response1.rows[0].class_id, email]);
                        if(response3.error) {
                            res.status(500).json({error:true, message:"Some Internal Server Error"});
                        }
                        res.status(200).json({error:false, message:"Successfully Enrolled"});
                    }

                }
    
            
            }
        }
    }catch(e){
            res.status(500).json({error:true, response:e, message:"internal server error"});
        
    }
}

module.exports = {createClass, updateClass, classdetatils , enroll}