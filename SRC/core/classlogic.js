const { v4: uuidv4 } = require('uuid');
const bannerdb = require('../database/schema/banner'); 

const createClass =async (req, res)=>{
    const {classname, subject,section,description } = req.body;
    let classid = uuidv4();
    let result =await bannerdb.find({}, { projection: { _id: 1 } });
    const ids = result.map(doc => doc._id);
    console.log("bannerid: "+ids);
    res.status(200).json({error:false, message:"class created successfully"});
};

const updateClass = (req, res)=>{

};

module.exports = {createClass, updateClass}