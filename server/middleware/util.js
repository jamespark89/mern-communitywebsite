const Job = require("../models/jobs.model")
const util = {}

util.isLoggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect("auth/login/failed")
  }
}

util.noPermission = function (req, res) {
  req.flash("errors", {
    login: "You don't have permission"
  })
  req.logout()
  res.redirect("/login")
}

util.checkPermission = function (req, res, next) {
  Job.findOne({ _id: req.params.id }, function (err, job) {
    if (err) return res.json(err)
    if (job.author != req.user._id)
      return util.noPermission(req, res)

    next()
  })
}
module.exports = util
