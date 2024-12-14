const passport = require('passport');
const User = require('../models/AuthModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async(access,refresh,profile,done)=>{
        try {
            let user = await User.findOne({googleId: profile.id});
            if(!user){
                user = await User.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    userName: profile.displayName,
                    image: profile.photos[0].value
                });
            }
            return done(null,user);
        } catch (error) {
            console.log(error);
        }
    }
));


passport.serializeUser((user,done)=>{
    done(null, user.id);
});
passport.deserializeUser(async(id,done)=>{
    try {
        const user = await User.findById(id);
        done(null,user);
    } catch (error) {
        done(error,null);
    }
});


module.exports = passport;