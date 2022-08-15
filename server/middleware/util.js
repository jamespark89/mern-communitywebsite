const Job = require("../models/jobs.model")
const util = {}

util.isLoggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send("Please Log in")
  }
}

util.noPermission = function (req, res) {
  req.send("errors", {
    login: "You don't have permission"
  })
  req.logout()
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
