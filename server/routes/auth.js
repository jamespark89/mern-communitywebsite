var express = require("express")
var router = express.Router()
var passport = require("passport")

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    req.session.destroy()
    console.log("logout")
    res.redirect("http://localhost:3000")
  })
})

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile"] })
)

router.get(
  "/google/callback",
  passport.authenticate("google"),
  authSuccess
)

function authSuccess(req, res) {
  res.redirect("http://localhost:3000")
}

module.exports = router
