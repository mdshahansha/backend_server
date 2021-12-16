module.exports.home=function(req,res){
    console.log(req.cookies);
    // res.cookie('user mom',25);
    return res.render('home',{
        title:"Home"
    }
    );
    // return res.end(' <h1>name of home contoller</h1> ')
}