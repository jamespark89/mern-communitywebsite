const Job = require("../models/jobs.model")
const util = require("../middleware/util")

// @desc   Get jobs
// @route  GET /api/jobs
// @access Private
const getJobs = (req, res) => {
  Job.find()
    .populate("author")
    .limit(20)
    .sort("-createdAt")
    .then((jobs) => res.json(jobs))
    .catch((err) => res.status(400).json("Error:" + err))
}

// @desc   Set jobs
// @route  POST /api/jobs
// @access Private
const setJob = (req, res) => {
  const author = req.user._id
  const username = req.body.username
  const title = req.body.title
  const contents = req.body.contents
  const date = Date.parse(req.body.date)
  const newJob = new Job({
    username,
    title,
    contents,
    date,
    author
  })
  newJob
    .save()
    .then(() => res.json("Job added!"))
    .catch((err) => res.status(400).json("Error:" + err))
}

// @desc   Update job
// @route  PUT /api/jobs/:id
// @access Private
const updateJob = (req, res) => {
  Job.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    (err, jobs) => {
      if (err) return res.json(err)
      res.redirect("/job")
    }
  )
}

// @desc   delete job
// @route  DELETE /api/jobs/:id
// @access Private
const deleteJob = (req, res) => {
  ;(req, res) => {
    Job.findByIdAndDelete(req.params.id)
      .then(() => res.json("Job deleted."))
      .catch((err) => res.status(400).json("Error:" + err))
  }
}

// @desc   Get job by id
// @route  GET /api/jobs/:id
// @access Private
const getJobById = (req, res) => {
  Job.findById(req.params.id)
    .populate("author")
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error:" + err))
}

module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
  getJobById
}
