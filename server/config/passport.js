const passport = require("passport")
const GoogleStrategy =
  require("passport-google-oauth20").Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        "http://localhost:3001/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("auth success")
      return cb(null, profile)
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})
module.exports = passport
