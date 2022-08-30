const passport = require("passport")
const User = require("../models/user.model")
const {
  registerGoogleUser
} = require("../controllers/userController")
var GoogleStrategy =
  require("passport-google-oauth20").Strategy

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
      // Check if user exists
      User.findOne(
        { googleId: profile.id },
        function (err, user) {
          if (user) {
            return cb(null, user)
          }
          //if user doesn't exist
          const newUser = registerGoogleUser(profile)
          User.findOne(
            { googleId: profile.id },
            (err, user) => {
              return cb(null, user)
            }
          )
        }
      )
    }
  )
)

module.exports = passport
