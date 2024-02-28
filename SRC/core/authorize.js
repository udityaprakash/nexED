const pool = require('../database/connections/postgreSQL');
const handleuser = (req, res) => {
    const {userid, profile_url, username, email} = req.body;
    
    res.status(200).json({message: 'User is authorized'});
};







const authhand = {
    handleuser,
};

module.exports = authhand;