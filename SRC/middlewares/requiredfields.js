function isValidUUIDv4(uuid) {
    const uuidv4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidv4Pattern.test(uuid);
}

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

const filefield = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({error:true, msg:'No upload file provided in the POST request.'});
    }else{
        
        next();

    }
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
        if(isValidUUIDv4(classid)){

            next();
        }else{
            res.status(400).json({
                error: true, 
                message: 'Invalid classid', 
                fields: ["classid"]});
        }
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

const fichercontent = (req, res, next) => {
    const {title, description, mediaAsset_ids} = req.body;
    if(title && description && mediaAsset_ids){
        next();
    } else {
        res.status(400).json({
            error: true, 
            message: 'Please provide all required fields', 
            fields: ["title", "description", "mediaAsset_ids"]});
    }
};

const middleware = {
    signup,
    userfield,
    filefield,
    authorization,
    classfields,
    classid,
    join_code,
    fichercontent
};

module.exports = middleware;