const router = require("express").Router()
const Job = require("../models/jobs.model")
const util = require("../middleware/util")
const User = require("../models/user.model")
router.get("/", (req, res) => {
  Job.find()
    .populate("author")
    .limit(20)
    .sort("-createdAt")
    .then((jobs) => res.json(jobs))
    .catch((err) => res.status(400).json("Error:" + err))
})

router.post("/add", util.isLoggedin, (req, res) => {
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
})

router.route("/:id").get((req, res) => {
  Job.findById(req.params.id)
    .populate("author")
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error:" + err))
})

router
  .route("/:id")
  .delete(
    util.isLoggedin,
    util.checkPermission,
    (req, res) => {
      Job.findByIdAndDelete(req.params.id)
        .then(() => res.json("Job deleted."))
        .catch((err) =>
          res.status(400).json("Error:" + err)
        )
    }
  )

router
  .route("/update/:id")
  .post(
    util.isLoggedin,
    util.checkPermission,
    (req, res) => {
      Job.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        (err, jobs) => {
          if (err) return res.json(err)
          res.redirect("/job")
        }
      )
    }
  )

module.exports = router
