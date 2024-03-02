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

const emailfield = (req, res, next) => {
    const {email} = req.body;
    if(email){
        next();
    } else {
        res.status(400).json({
            error: true, 
            message: 'Please provide all required fields', 
            fields: ["email"]});
    }
}

const imagefield = (req, res, next) => {
    if(req.file){
        next();
    } else {
        res.status(400).json({
            error: true, 
            message: 'Please provide all required fields', 
            fields: ["banner_image"]});
    }
}

const middleware = {
    signup,
    emailfield,
    imagefield
};

module.exports = middleware;