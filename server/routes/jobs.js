const router = require("express").Router()
const util = require("../middleware/util")

const {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
  getJobById
} = require("../controllers/jobController")
router.get("/", getJobs)

router.post("/", util.isLoggedin, setJob)

router.get("/:id", getJobById)

router.delete(
  "/:id",
  util.isLoggedin,
  util.checkPermission,
  deleteJob
)

router.put(
  "/:id",
  util.isLoggedin,
  util.checkPermission,
  updateJob
)

module.exports = router
