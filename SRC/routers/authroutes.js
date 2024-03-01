const express = require('express');
const router = express.Router();
const auth = require('../core/authorize');
const required = require('../middlewares/requiredfields');


router.post('/user/Signup',required.signup, auth.signup);
router.post('/user/RefreshLogin',required.emailfield, auth.refreshUser);


module.exports = router;
