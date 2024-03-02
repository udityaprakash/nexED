const bannerschema = require('../../database/schema/banner');
const {compressor} = require('../../middlewares/imageprocess');
const saveBanner = async (req,res)=>{
    try{
        if (!req.file) {
            return res.status(400).json({error:true, error: 'No file uploaded.' });
          }
        //   console.log(req.file);
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

const extractedPhoto = async (req,res)=>{
  try{
      const id = req.params.id;
      const photo = await bannerschema.findOne({_id:id});
      if(photo){
          res.set('Content-Type', photo.banner_photo.contentType);
          res.send(photo.banner_photo.data);
      }else{
          res.status(404).json({error:true, msg: 'No offer found' });
      }
  }catch(_error){
      res.status(500).json({ error:true, err:_error, msg: 'Internal server error', });
  }
}

module.exports = {saveBanner, extractedPhoto};