const filemeametypechecker =(req, res, next) => {
    if(!req.file){
        return res.status(400).json({error:true, error: 'No file uploaded.' });
    }else{
        const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
        const { mimetype } = req.file;
        if(allowedFileTypes.includes(mimetype)){
            next();
        }else{
            res.json({error:true, message: 'only pdfs, docs, ppts and images allowed' });
        }
    }
}
const type = {
    filemeametypechecker
}

module.exports = type;