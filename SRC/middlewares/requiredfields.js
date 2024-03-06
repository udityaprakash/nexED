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

const userfield = (req, res, next) => {
    const {userid , email} = req.body;
    if(userid && email){
        next();
    } else {
        res.status(400).json({
            error: true, 
            message: 'Please provide all required fields', 
            fields: ["userid", "email"]});
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

const classid = (req, res, next) => {
    const {classid} = req.body;
    if(classid){
        next();
    } else {
        res.status(400).json({
            error: true, 
            message: 'Please provide all required fields', 
            fields: ["classid"]});
    }
};

const join_code = (req, res, next) => {
    const {join_code} = req.body;
    if(join_code){
        next();
    } else {
        res.status(400).json({
            error: true, 
            message: 'Please provide all required fields', 
            fields: ["join_code"]});
    }
};

const middleware = {
    signup,
    userfield,
    imagefield,
    authorization,
    classfields,
    classid,
    join_code
};

module.exports = middleware;