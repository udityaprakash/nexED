const express = require('express');
const router = express.Router();
const admin = require('../middlewares/adminaccess');
const {image} = require('../middlewares/imageprocess');
const {saveBanner} = require('../core/Admin/Storebanner');
var middleware = require('../middlewares/requiredfields');
const {executeQuery} = require('../core/Admin/QueryExc');

router.post('/upload/banner',admin ,
image.single('banner'),
// middleware.imagefield,
  saveBanner);


router.post('/query',admin,executeQuery)


module.exports = router;