const express = require('express');
const router = express.Router();
const auth = require('../core/authorize');
const required = require('../middlewares/requiredfields');
const {isTokenexp} = require('../middlewares/auth');


router.post('/user/Signup',required.signup, auth.signup);

router.post('/user/RefreshLogin', required.authorization, required.emailfield, isTokenexp, auth.generatetoken);


module.exports = router;
