const express = require('express');
const router = express.Router();
const {extractedPhoto} = require('../core/Admin/Storebanner');
const {verifytoken} = require('../middlewares/auth');
const {createClass} = require('../core/classlogic');
const middleware = require('../middlewares/requiredfields');

router.get('/banner/:id',extractedPhoto);
router.post('/create/class',middleware.authorization ,verifytoken, middleware.classfields,createClass);

module.exports = router;
