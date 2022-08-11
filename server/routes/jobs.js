const router = require("express").Router()
let Job = require("../models/jobs.model")

router.route("/").get((req, res) => {
  Job.find()
    // .populate("author")
    .limit(20)
    .sort({ jobId: -1 })
    .then((jobs) => res.json(jobs))
    .catch((err) => res.status(400).json("Error:" + err))
})

router.route("/add").post((req, res) => {
  const username = req.body.username
  const title = req.body.title
  const contents = req.body.contents
  const date = Date.parse(req.body.date)
  // const author = req.user.id
  const newJob = new Job({
    username,
    title,
    contents,
    date
    // author
  })

  newJob
    .save()
    .then(() => res.json("Job added!"))
    .catch((err) => res.status(400).json("Error:" + err))
})

router.route("/:id").get((req, res) => {
  Job.findById(req.params.id)
    // .populate("author")
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error:" + err))
})

router.route("/:id").delete((req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then(() => res.json("Job deleted."))
    .catch((err) => res.status(400).json("Error:" + err))
})

router.route("/update/:id").post((req, res) => {
  Job.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    (err, jobs) => {
      if (err) return res.json(err)
      res.redirect("/job")
    }
  )
})

module.exports = router
