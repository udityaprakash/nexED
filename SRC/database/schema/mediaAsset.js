const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mediaAsset= new Schema({
    attachment:{
        name: String,
        data: Buffer,
        contentType: String,
    },

}, { timestamps: true });

module.exports = mongoose.model("media_asset" , mediaAsset);