const util = {}

util.isLoggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log("Auth")
    next()
  } else {
    console.log("NotAuth")
    res.redirect("/fail")
  }
}

module.exports = util
