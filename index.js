const express=require('express');
const cookieParser=require('cookie-parser');
const app =express();
const port=8000;
const db=require('./config/mongoose');
const expressLayouts=require('express-ejs-layouts');

//session cookie parser
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'))

// extract style and scripts from sub pages into the layout
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true)
//setup the view engine
app.set('view engine','ejs');
app.set('views','./views')

app.use(session({
    name:'codeial_beti**',
    //todo chnages the secret  before deployement in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.setAuthenticatedUser)
app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`faccing error to reach the PORT ${port}`);
    }
    console.log(`server running SUCCESSFULLY ${port}`)
})