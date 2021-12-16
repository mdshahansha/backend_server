const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user --> Passport");
          return done(err);
        }

        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> Passport");
      return done(err);
    }

    return done(null, user);
  });
});

//check if the user is an authenticated
passport.isAuthenticated(function (req, res, next) {
  if (isAuthenticated()) {
    return next();
  }
  //if user is not signed in
  return res.redirect("/users/sign-in");
});
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in user from the session  adn we are just sending this to a locals for views
    req.locals.user = req.user;
  }
  next();
};

module.exports = passport;
// const passport = require("passport");
// const LocalStrategy = require('passport-local').Strategy;

// const User = require("../models/users");

// //authentication using passport
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//     },
//     function (email, password, done) {
//       //find a user establish  a identity
//       User.findOne({ email: email }, function (err, user) {
//         if (err) {
//           console.log("error in finding the user CHECK ONCE AGAIN");
//           return done(err);
//         }
//         if (!user || user.passport != password) {
//           console.log("Invalid username /password CHECK AGAIN");
//           return done(null, false);
//         }
//       });
//     }
//   )
// );
// //serializing the user to decide which keys is kept in cookies
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// //deserializing the user from th key in the cookies
// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     if (err) {
//       console.log("error in finding the user->password CHECK ONCE AGAIN");
//       return done(err);
//     }
//   });
// });

// module.exports = passport;
