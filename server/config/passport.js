const passport = require("passport")
const User = require("../models/user.model")
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
      User.findOne(
        { googleId: profile.id },
        (err, user) => {
          if (user) {
            return cb(null, user)
          } else {
            console.log(profile)
            const googleId = profile.id
            const username = profile.displayName
            const email = profile.emails[0].value
            const picture = profile.photos[0].value
            const newUser = new User({
              googleId,
              username,
              email,
              picture
            })
            newUser.save().then(() => {
              User.findOne(
                { googleId: profile.id },
                (err, user) => {
                  return cb(null, user)
                }
              )
            })
          }
        }
      )
    }
  )
)

module.exports = passport
