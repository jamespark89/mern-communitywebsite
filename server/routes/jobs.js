const router = require("express").Router()
let Job = require("../models/jobs.model")

router.route("/").get((req, res) => {
  Job.find()
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
  const newJob = new Job({
    username,
    title,
    contents,
    date
  })

  newJob
    .save()
    .then(() => res.json("Job added!"))
    .catch((err) => res.status(400).json("Error:" + err))
})

router.route("/:id").get((req, res) => {
  Job.findById(req.params.id)
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error:" + err))
})

router.route("/:id").delete((req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then(() => res.json("Job deleted."))
    .catch((err) => res.status(400).json("Error:" + err))
})

router.route("/update/:id").post((req, res) => {
  Job.findById(req.params.id)
    .then((jobs) => {
      jobs.username = req.body.username
      jobs.title = req.body.title
      jobs.contents = req.body.contents
      jobs.date = Date.parse(req.body.date)

      jobs
        .save()
        .then(() => res.json("jobs updated!"))
        .catch((err) =>
          res.status(400).json("Error:" + err)
        )
    })
    .catch((err) => res.status(400).json("Error:" + err))
})

module.exports = router
