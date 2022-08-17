const router = require("express").Router()
const {
  getMe,
  getUsers
} = require("../controllers/userController")
const util = require("../middleware/util")

router.get("/", getUsers)
router.get("/me", getMe)

module.exports = router
