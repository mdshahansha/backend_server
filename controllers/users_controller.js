const User = require("../models/users");

module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render('user_profile', {
          title: "User Profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sign-in");
      }
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

module.exports.signup = function (req, res) {
  return res.render("user_sign_up", {
    title: "User Sign Up",
  });
};
module.exports.signin = function (req, res) {
  return res.render("user_sign_in", {
    title: "User Sign In",
  });
};

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
      
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        console.log(req.body);
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
//  module.exports.create = function(req, res){
//      if(req.body.password!=req.body.confirm_password){
//         //  console.log('error in creating the use sign up data',err);
//         return res.redirect('back');
//      }

//      User.findOne({email:req.body.email},function(err,user){
//          if(err){
//              console.log('error in creating the USER sign from make sure ur constroller is working  good',err);
//          }
//          if(!user){
//              User.create(req.body,function(err,user){
//                  if(err){
//                      console.log('error in creating the USER signUP DATA',err);
//                  }
//                  return res.redirect('/users/sign-in');
//              })
//          }else{
//              return res.redirect('back');
//          }
//      })
//  }

// module.exports.createSession = function (req, res) {
  //todo

  // User.findOne({ email: req.body.email }, function (err, user) {
  //   if (err) {
  //     console.log("error in signing up the data", err);
  //     return;
  //   }
  //   if (user) {
  //     if (user.password != req.body.password) {
  //       return res.redirect("back");
  //     }

  //     res.cookie("user_id", user.id);
  //     return res.redirect("/users/profile");
  //   } else {
  //     return res.redirect("back");
  //   }
  // });
// };
module.exports.createSession = function (req, res) {
  return res.redirect('/');
}
