const Job = require("../models/job.model")
const House = require("../models/house.model")
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
  const baseUrl = req.baseUrl.slice(5)
  let postById = ""
  if (baseUrl == "jobs") {
    postById = await Job.findById(req.params.id)
  } else if (baseUrl == "houses") {
    postById = await House.findById(req.params.id)
  }

  if (postById.author == req.user._id) {
    next()
  } else {
    return res.status(401).send("You don't have permission")
  }
}

module.exports = util
