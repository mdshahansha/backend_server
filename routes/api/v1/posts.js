const express=require('express');
const router=express.Router();
const passport = require('passport');

const postApi= require('../../../controllers/api/v1/posts_api');

router.get('/',postApi.index);
//to stop the session-cookies get generated we put the value as false
router.delete('/:id',passport.authenticate('jwt',{session:false }),postApi.destroy);

module.exports = router;