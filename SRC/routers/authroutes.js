const express = require('express');
const router = express.Router();
const auth = require('../core/authorize');
const middleware = require('../middlewares/requiredfields');


router.post('/user/Signup',middleware.signup, auth.handleuser);

module.exports = router;
