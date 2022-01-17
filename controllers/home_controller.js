const Post = require("../models/post");
const User = require("../models/users");
// module.exports.home=function(req,res){
//     console.log(req.cookies);
//     // res.cookie('user mom',25);
//     return res.render('home',{
//         title:"Home"
//     }
//     );
//     // return res.end(' <h1>name of home contoller</h1> ')
// }

module.exports.home =async function (req, res) {
  try{

    let posts=await Post.find({})
    .sort('-createdAt')
    .populate("user")
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
     let users= await User.find({});
      
      return res.render("home", {
        title: "H o m e 😋",
        posts: posts,
        all_users:users
      });
      
  }catch(err){
    console.log('error agya',err);
    return;
  }
};
