const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();

const image = multer({
    storage
});

const ficherAsset = multer({
    storage: storage,
    // fileFilter: (req, file, cb) => {
    //     const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.ms-powerpoint'];
    //     if (allowedFileTypes.includes(file.mimetype)) {
    //     cb(null, true);
    //     } else {
    //     cb(new Error('Invalid file type. Allowed types: jpg, png, pdf, doc, ppt.'));
    //     }
    // },
});

async function compressor(buffer){
    const compressedImageBuffer = await sharp(buffer)
          .resize({ width: 800 })
          .toBuffer();
    return compressedImageBuffer;      
}

module.exports = { image, ficherAsset, compressor} ;