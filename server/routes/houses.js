const router = require("express").Router()
const util = require("../middleware/util")
// const multer = require("multer")
// const upload = multer({ dest: "uploads/" })
const upload = require("../middleware/multer")
const {
  getHouses,
  setHouse,
  updateHouse,
  deleteHouse,
  getHouseById
} = require("../controllers/houseController")
router.get("/", getHouses)

router.post("/", upload.array("image"), setHouse)

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
  upload.array("image"),
  updateHouse
)

module.exports = router
