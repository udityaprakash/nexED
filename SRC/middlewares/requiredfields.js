const signup = (req, res, next) => {
    const {userid, profile_url, username, email} = req.body;
    if(userid && profile_url && username && email){
        next();
    } else {
        res.status(400).json({
            error: true, 
            message: 'Please provide all required fields', 
            fields: ["userid", "profile_url", "username", "email"]});
    }
};

const middleware = {
    signup,
};

module.exports = middleware;