const Job = require("../models/job.model")
const asyncHandler = require("express-async-handler")
const User = require("../models/user.model")
// @desc   Get jobs
// @route  GET /api/jobs
// @access Private
const getJobs = asyncHandler(async (req, res) => {
  const page = req.query.page
  const limit = req.query.limit
  const jobs = await Job.find()
    .populate("author")
    .limit(limit)
    .skip((page - 1) * limit)
    .sort("-createdAt")
  const totalCount = await Job.collection.countDocuments()
  res.status(200).json({ jobs, totalCount })
})

// @desc   Set jobs
// @route  POST /api/jobs
// @access Private
const setJob = asyncHandler(async (req, res) => {
  if (!req.body.username) {
    res.status(401)
    throw new Error("Please login first")
  }
  if (!req.body.title) {
    res.status(400)
    throw new Error("Please add a title")
  }
  if (!req.body.contents) {
    res.status(400)
    throw new Error("Please add a content")
  }
  const job = await Job.create({
    username: req.body.username,
    title: req.body.title,
    contents: req.body.contents,
    author: req.user._id
  })
  res.status(200).json(job)
})

// @desc   Update job
// @route  PUT /api/jobs/:id
// @access Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
  if (!job) {
    res.status(400)
    throw new Error("Job not found")
  }
  const updatedJob = await Job.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedJob)
})

// @desc   delete job
// @route  DELETE /api/jobs/:id
// @access Private
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
  if (!job) {
    res.status(400)
    throw new Error("job not found")
  }
  await job.remove()
  res.status(200).json({ id: req.params.id })
})

// @desc   Get job by id
// @route  GET /api/jobs/:id
// @access Private
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate(
    "author"
  )
  res.status(200).json(job)
})

module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
  getJobById
}
