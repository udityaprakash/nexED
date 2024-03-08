const express = require('express');
const router = express.Router();
const {ficherAsset} = require('../middlewares/fileprocess');
const type = require('../middlewares/datatype');
// const {extractedPhoto} = require('../core/Admin/Storebanner');
const {verifytoken} = require('../middlewares/auth');
const {createClass, updateClass, classdetatils, enroll, uploadFicherAssest} = require('../core/classlogic');
const middleware = require('../middlewares/requiredfields');

const authAndverfication =[middleware.authorization, verifytoken];

// router.get('/banner/:id',extractedPhoto);

router.post('/create', authAndverfication, middleware.classfields, createClass);

router.patch('/update', authAndverfication, middleware.classfields, middleware.classid, updateClass);

router.post('/details', authAndverfication, middleware.classid, classdetatils);

router.post('/join', authAndverfication, middleware.join_code, enroll);

//checked this api call
router.post('/upload/ficher/asset', authAndverfication, ficherAsset.single('attachment'), middleware.filefield,  type.filemeametypechecker,
uploadFicherAssest);

// router.

router.all('*', (req, res) => {
    res.status(404).json({error:true, message: 'Page not found'});
  });

module.exports = router;
