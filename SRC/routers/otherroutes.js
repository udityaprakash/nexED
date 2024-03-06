const express = require('express');
const router = express.Router();
const {extractedPhoto} = require('../core/Admin/Storebanner');
const {verifytoken} = require('../middlewares/auth');
const {createClass, updateClass, classdetatils, enroll} = require('../core/classlogic');
const middleware = require('../middlewares/requiredfields');

const authAndverfication =[middleware.authorization, verifytoken];

router.get('/banner/:id',extractedPhoto);
router.post('/create/class', authAndverfication, middleware.classfields, createClass);
router.patch('/update/class', authAndverfication, middleware.classfields, middleware.classid, updateClass);
router.post('/details/class', authAndverfication, middleware.classid, classdetatils);
router.post('/enroll/class', authAndverfication, middleware.join_code, enroll);

module.exports = router;
