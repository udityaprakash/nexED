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
    if (!req.files) {
        return res.status(400).json({error:true, msg:'No upload file provided in the POST request.'});
    }
    console.log('passed imagefield middleware');
    next();
}

const authorization = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        next();
    }else{
        res.status(401).json({error:true, re_login_required:false ,message: 'Bearer Token missing'});
    }
}
const classfields = (req, res, next) => {
    const {classname, subject } = req.body;
    if(classname && subject){
        next();
    } else {
        res.status(400).json({
            error: true, 
            message: 'Please provide all required fields', 
            fields: ["classname","subject",]});
    }
};

const middleware = {
    signup,
    emailfield,
    imagefield,
    authorization,
    classfields
};

module.exports = middleware;