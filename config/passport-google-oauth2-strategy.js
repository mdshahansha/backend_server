const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    
    clientID: '1035866324270-bc4ut6afrsb7h8toi5s18uuq2rg9n5cj.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;
// const passport = require('passport');
// const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
// // const googleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const User=require('../models/users');
// const crypto=require('crypto');


// // tell passport to use a new strategy for google login
// passport.use(new googleStrategy)({
//     clientId: '1035866324270-bc4ut6afrsb7h8toi5s18uuq2rg9n5cj.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackUrl: 'http://localhost:8000/users/auth/google/callback',
// },function(accessToken, refreshToken,profile,done){
//    //find a user
//     User.findOne({email: profile.emails[0].value}).exec(function(err,user){
//        if(err)
//        {
//         console.log('error in goog STRATEGY',err);
//         return;
//     }
//     console.log(accessToken,refreshToken);
//     console.log(profile);

//     if(user){
//         //if found set this user as a request user
//         return done(null,user);
//     }else{
//         //if not found create. a user ,and set it as new req.user
//         User.create({
//             name:profile.displayName,
//             email:profile.emails[0].value,
//             password:crypto.randomBytes(20).toString('hex')
//         },function(err,user){
//             if(err){
//                 console.log('error in creating user google STRAGTEGY AGAIN **',err);
//                 return;
//             }
//             return done(null,user);
//         })
//     }

//     })
// }
// )
// module.exports=passport;