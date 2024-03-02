const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bannerSchema= new Schema({
    banner_photo:{
        name: String,
        data: Buffer,
        contentType: String,
      },

}, { timestamps: true });

module.exports = mongoose.model("banner" , bannerSchema);