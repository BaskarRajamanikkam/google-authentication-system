//Third party files
const express = require('express');

const dotenv = require('dotenv');
const passport = require('passport');
const session =require('express-session');


// express app initialize
const app = express();

//dotenv config
dotenv.config();

// passport config file 
require('./config/passport');



app.use(express.json());
app.use(express.urlencoded({extended:false}));

//session storage
app.use(session({
    secret: process.env.session_secret,
    resave:false,
    saveUninitialized: false
}))

//passport use
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/v1',require('./routes/AuthRoute'));




// export express app 
module.exports = app;