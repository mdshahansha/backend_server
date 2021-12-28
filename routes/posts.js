const express=require('express');
const router=express.Router();
const passport = require('passport');


const postContoller=require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication ,postContoller.create);

module.exports = router;