const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const image = multer({
    storage
});

async function compressor(buffer){
    const compressedImageBuffer = await sharp(buffer)
          .resize({ width: 800 })
          .toBuffer();
    return compressedImageBuffer;      
}

module.exports = { image, compressor} ;