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
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
      state: true
    },
    function verify(
      accessToken,
      refreshToken,
      profile,
      cb
    ) {
      // Check if user exists
      User.findOne(
        { googleId: profile.id },
        async (err, user) => {
          if (user) {
            return cb(null, user)
          } else {
            //if user doesn't exist
            const newUser = await registerGoogleUser(
              profile
            )
            console.log(newUser)
            User.findOne(
              { googleId: profile.id },
              (err, user) => {
                return cb(null, user)
              }
            )
          }
        }
      )
    }
  )
)

module.exports = passport
