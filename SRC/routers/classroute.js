const express = require('express');
const router = express.Router();
const {ficherAsset} = require('../middlewares/fileprocess');
const type = require('../middlewares/datatype');
// const {extractedPhoto} = require('../core/Admin/Storebanner');
const {verifytoken} = require('../middlewares/auth');
const {createClass, updateClass, classdetatils, enroll,fichercontent, uploadFicherAssest, uploadfichercomment, resetjoincode} = require('../core/classlogic');
const middleware = require('../middlewares/requiredfields');
const check = require('../middlewares/chechauthentic');
const set = require('../middlewares/set');
const {teaching_view, joined_view} = require('../core/components/classview');

const authAndverfication =[middleware.authorization, verifytoken];

router.post('/create', authAndverfication,  middleware.classfields, check.here, set.usertype_and_nclass, createClass);

router.patch('/update', authAndverfication, middleware.classfields, middleware.classid, updateClass);

router.post('/details', authAndverfication, middleware.classid, classdetatils);

router.post('/join', authAndverfication, middleware.join_code, enroll);

//reset the join code
router.post('/join/reset', authAndverfication,middleware.classid, check.isclasscreater,resetjoincode);

router.post('/ficher/upload/asset', authAndverfication, ficherAsset.single('attachment'), middleware.filefield,  type.filemeametypechecker,
uploadFicherAssest);

router.post('/ficher/content', authAndverfication, middleware.classid, middleware.fichercontent, check.isclasscreater, fichercontent);

router.post('/ficher/comment', authAndverfication, middleware.fichercomment, check.iseligibleforcomment, uploadfichercomment);

router.post('/h/tought', authAndverfication, teaching_view);

router.post('/h/joined', authAndverfication, joined_view);

router.all('*', (req, res) => {
    res.status(404).json({error:true, message: 'Page not found'});
  });

module.exports = router;

