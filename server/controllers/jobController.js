const Job = require("../models/job.model")
const asyncHandler = require("express-async-handler")

// @desc   Get jobs
// @route  GET /api/jobs
// @access Private
const getJobs = asyncHandler(async (req, res) => {
  const page = req.query.page
  let totalCount = 0
  const limit =
    req.query.limit == "undefined" ? 0 : req.query.limit
  const userId =
    req.query.userId == "undefined" ||
    req.query.userId == "null"
      ? undefined
      : req.query.userId
  const query =
    req.query.query == "null" ||
    req.query.query == undefined
      ? ""
      : req.query.query
  let jobs = []
  if (!userId) {
    jobs = await Job.find({
      title: { $regex: `(?i)${query}` }
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort("-createdAt")
    totalCount = await Job.collection.countDocuments()
  } else {
    jobs = await Job.find({
      author: userId,
      title: { $regex: `(?i)${query}` }
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort("-createdAt")

    const filteredJob = await Job.find({
      author: userId
    })
    totalCount = filteredJob.length
  }
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
