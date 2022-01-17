const User = require('../models/users');
const fs=require('fs');
const path=require('path');


module.exports.profile =async function(req, res){
try{
    let user=await User.findById(req.params.id)
    return res.render('user_profile',{
        title:'User profile',
        profile_user:user
    })
}catch(err){
console.log('error in fethcing details profile',err);
}
        
    
} 




// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        console.log("user signed hoGAYA");
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


 

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

//update the name email address
module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){  

    try{
     
       let user=await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
            if(err){console.log('MUlter**** Error hua h',err)}
            
            
            user.name=req.body.name;
            user.email=req.body.email;
            

            if(req.file){
                
                if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                
                // this is saving the path of the upload file into avatar field in the user 
                user.avatar=User.avatarPath+'/'+req.file.filename
            }
            user.save();
         return res.redirect('back');
        }) 
     }catch(err){
            req.flash('error',err);
            return res.redirect('back');
    }


}else{
    req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
}
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Succefully')
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success','You Loggged Out! ')

    return res.redirect('/');
}