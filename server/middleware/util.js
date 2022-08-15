const Job = require("../models/job.model")
const util = {}

util.isLoggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send("Please Log in")
  }
}

util.noPermission = async function (req, res) {
  res.status(401).send("You don't have permission")
}

util.checkPermission = async function (req, res, next) {
  const job = await Job.findById(req.params.id)

  if (job.author == req.user._id) {
    next()
  } else {
    return res.status(401).send("You don't have permission")
  }
}

module.exports = util
