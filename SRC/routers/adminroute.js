const express = require('express');
const router = express.Router();
const admin = require('../middlewares/adminaccess');
const {image} = require('../middlewares/imageprocess');
const {saveBanner} = require('../core/Admin/Storebanner');


router.post('/upload/banner',admin ,image.single('banner'), saveBanner);


module.exports = router;