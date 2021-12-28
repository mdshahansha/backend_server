const Post=require('../models/post');
// module.exports.home=function(req,res){
//     console.log(req.cookies);
//     // res.cookie('user mom',25);
//     return res.render('home',{
//         title:"Home"
//     }
//     );
//     // return res.end(' <h1>name of home contoller</h1> ')
// }

module.exports.home = function(req, res){
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:'H o m e 😋',
            posts:posts
        })
    })
}