const multer = require("multer")
const path = require("path")
const uuid = require("uuid")
const sharp = require("sharp")
const fs = require("fs")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4().toString() + "_" + file.originalname)
  }
})

const upload = multer({ storage: storage })

const resizeImages = async (req, res, next) => {
  if (!req.files) return next()
  req.body.images = []
  await Promise.all(
    req.files.map(async (file) => {
      const filename = file.filename.replace(/\..+$/, "")
      const newFilename = `${filename}-${Date.now()}.jpeg`
      await sharp(file.path)
        .resize(640, 480)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`tmp/${newFilename}`)
      const newFile = {
        path: `tmp/${newFilename}`,
        filename: newFilename
      }
      req.body.images.push(newFile)
      fs.unlinkSync(`${file.path}`)
    })
  )

  next()
}
module.exports = { upload, resizeImages }
