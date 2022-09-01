const multer = require("multer")
const path = require("path")
const uuid = require("uuid")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4().toString() + "_" + file.originalname)
  }
})

const upload = multer({ storage: storage })

module.exports = upload
