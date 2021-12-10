const express=require('express');
const app =express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
app.use(express.static('./assets'))

app.set('layout extractStyles',true);
app.set('layout extractScripts',true)
const db=require('./config/mongoose');

app.use('/',require('./routes'));


app.set('view engine','ejs');
app.set('views','./views')

app.listen(port,function(err){
    if(err){
        console.log(`faccing error to reach the PORT ${port}`);
    }
    console.log(`server running SUCCESSFULLY ${port}`)
})