const express = require('express');
const passport = require('passport');
const { isAuthenticated } = require('../middlewares/authentication');
const { verifyToken } = require('../controllers/AuthControllers');
const router = express.Router();

router.route('/auth/google').get(passport.authenticate('google',{scope:["profile", "email"]}));

router.route('/auth/google/callback').get(passport.authenticate('google',{failureRedirect:'/'}),
async(req,res)=>{
    let user = req.user;
    const ACCESS_TOKEN = await user.getJwtAccessToken();
   
    res.redirect(`http://localhost:5173/auth/callback?accessToken=${ACCESS_TOKEN}`);
});

router.route('/verify-token').post(isAuthenticated,verifyToken);



module.exports = router;