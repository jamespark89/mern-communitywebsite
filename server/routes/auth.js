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
    res.status(200).send()
  })
})

router.get(
  "/google/login",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
)

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed"
  }),
  // Successful authentication, redirect home.
  (req, res) => {
    console.log("login")
    if (process.env.NODE_ENV === "production") {
      res.redirect("/")
    } else {
      res.redirect(process.env.BASE_URL)
    }
  }
)

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure"
  })
})
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user
    })
  } else {
    res.json({
      success: false,
      user: null
    })
  }
})
module.exports = router
