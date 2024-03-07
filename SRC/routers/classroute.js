const express = require('express');
const router = express.Router();
// const {extractedPhoto} = require('../core/Admin/Storebanner');
const {verifytoken} = require('../middlewares/auth');
const {createClass, updateClass, classdetatils, enroll} = require('../core/classlogic');
const middleware = require('../middlewares/requiredfields');

const authAndverfication =[middleware.authorization, verifytoken];

// router.get('/banner/:id',extractedPhoto);
router.post('/create', authAndverfication, middleware.classfields, createClass);
router.patch('/update', authAndverfication, middleware.classfields, middleware.classid, updateClass);
router.post('/details', authAndverfication, middleware.classid, classdetatils);
router.post('/enroll', authAndverfication, middleware.join_code, enroll);


module.exports = router;
