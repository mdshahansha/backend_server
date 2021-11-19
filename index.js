const express=require('express');
const app =express();
const port=9000;

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`faccing error to reach the PORT ${port}`);
    }
    console.log('server running SUCCESSFULLY')
})