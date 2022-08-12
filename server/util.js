const util = {}

util.isLoggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect("/")
  }
}

module.exports = util
