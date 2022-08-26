const router = require("express").Router()
const util = require("../middleware/util")

const {
  getHouses,
  setHouse,
  updateHouse,
  deleteHouse,
  getHouseById
} = require("../controllers/houseController")
router.get("/", getHouses)

router.post("/", setHouse)

router.get("/:id", getHouseById)

router.delete(
  "/:id",
  util.isLoggedin,
  util.checkPermission,
  deleteHouse
)

router.put(
  "/:id",
  util.isLoggedin,
  util.checkPermission,
  updateHouse
)

module.exports = router
