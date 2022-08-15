const Job = require("../models/job.model")
const asyncHandler = require("express-async-handler")
// @desc   Get jobs
// @route  GET /api/jobs
// @access Private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find()
    .populate("author")
    .limit(20)
    .sort("-createdAt")

  res.status(200).json(jobs)
})

// @desc   Set jobs
// @route  POST /api/jobs
// @access Private
const setJob = asyncHandler(async (req, res) => {
  console.log("create1")
  if (!req.body.title) {
    res.status(400)
    throw new Error("Please add a title")
  }
  if (!req.body.contents) {
    res.status(400)
    throw new Error("Please add a content")
  }
  console.log("create2")
  const job = await Job.create({
    username: req.body.username,
    title: req.body.title,
    contents: req.body.contents,
    author: req.user._id
  })
  console.log("create3")
  res.status(200).json(job)
})

// @desc   Update job
// @route  PUT /api/jobs/:id
// @access Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
  if (!job) {
    res.status(400)
    throw new Error("job not found")
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
  console.log("1")
  const job = await Job.findById(req.params.id)
  if (!job) {
    res.status(400)
    throw new Error("job not found")
  }
  console.log("2")
  await job.remove()
  console.log("3")
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
