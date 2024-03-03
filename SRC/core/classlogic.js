const { v4: uuidv4 } = require('uuid');


const createClass = (req, res)=>{
    let classid = uuidv4();
    console.log("create class here: "+req.body);
};

const updateClass = (req, res)=>{

};

module.exports = {createClass, updateClass}