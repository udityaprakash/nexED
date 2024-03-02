const bannerschema = require('../../database/schema/banner');
const {compressor} = require('../../middlewares/imageprocess');
const saveBanner = async (req,res)=>{
    try{
        if (!req.file) {
            return res.status(400).json({error:true, error: 'No file uploaded.' });
          }
          const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
          const { originalname, buffer, mimetype } = req.file;

          if(allowedMimeTypes.includes(mimetype)){

            const compressedImageBuffer = await compressor(buffer);

            const bannerdata = new bannerschema({
                banner_photo: {
                    name: originalname,
                    data: compressedImageBuffer,
                    contentType: mimetype
                }
            });
              await bannerdata.save().then((data)=>{
                res.status(200).json({
                    error:false,
                    msg:"Banner Successfully saved!"
                });
              }).catch((err)=>{
                res.status(400).json({
                    error:true,
                    errormsg:err,
                    msg:"error occured on the database server side"
                });
              });
          
              
      
          }else{
              res.json({error:true, message: 'Not a png , jpg, heic, or jpeg file.' });
          }
        

    }catch(error){
        console.log(error);
        res.status(500).json({error:true, err:error, msg: 'Unsupported image format', });
    }
}

module.exports = {saveBanner};