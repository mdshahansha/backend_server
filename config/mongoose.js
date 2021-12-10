const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database_revison');

const db=mongoose.connection;

db.once('error',console.error.bind(console,"error is comming in mongo db dehko kiya error"));
db.on('open',function(){
    console.log('connection opened ::#MONGO DB')
})
module.exports = db;