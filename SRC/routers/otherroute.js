const express = require('express');
const router = express.Router();
const {extractedPhoto} = require('../core/Admin/Storebanner');


router.get('/banner/:id',extractedPhoto);

module.exports = router;