const House = require("../models/house.model")
const asyncHandler = require("express-async-handler")
const fs = require("fs")
const path = require("path")
const {
  uploadFile,
  deleteFile
} = require("../middleware/s3")
// @desc   Get houses
// @route  GET /api/houses
// @access Private
const getHouses = asyncHandler(async (req, res) => {
  const houses = await House.find()
    .populate("author")
    .limit(20)
    .sort("-createdAt")

  res.status(200).json(houses)
})

// @desc   Set house
// @route  POST /api/houses
// @access Private
const setHouse = asyncHandler(async (req, res) => {
  const files = req.files
  if (!req.user.username) {
    res.status(401)
    throw new Error("Please login first")
  }
  if (!req.body.streetAddress) {
    res.status(400)
    throw new Error("Please add a streetAddress")
  }
  if (!req.body.contents) {
    res.status(400)
    throw new Error("Please add a content")
  }
  //upload image files to S3 and then delete the temp files
  const houseImageFiles = await Promise.all(
    files.map(async (file) => {
      const result = await uploadFile(file)
      fs.unlinkSync(`${file.path}`)
      return result.Key
    })
  )

  const house = await House.create({
    username: req.user.username,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    totalBedrooms: req.body.totalBedrooms,
    totalBathrooms: req.body.totalBathrooms,
    bedType: req.body.bedType,
    contents: req.body.contents,
    price: req.body.price,
    gender: req.body.gender,
    author: req.user._id,
    houseImage: houseImageFiles
  })
  res.status(200).json(house)
})

// @desc   Update house
// @route  PUT /api/houses/:id
// @access Private
const updateHouse = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id)
  if (!house) {
    res.status(400)
    throw new Error("House not found")
  }
  await Promise.all(
    house.houseImage.map(async (fileKey) => {
      await deleteFile(fileKey)
    })
  )
  await Promise.all(
    (req.body.houseImage = files.map(async (file) => {
      const result = await uploadFile(file)
      fs.unlinkSync(`${file.path}`)
      return result.Key
    }))
  )

  const updatedHouse = await House.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedHouse)
})

// @desc   delete house
// @route  DELETE /api/houses/:id
// @access Private
const deleteHouse = asyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id)
  if (!house) {
    res.status(400)
    throw new Error("house not found")
  }
  await Promise.all(
    house.houseImage.map(async (fileKey) => {
      await deleteFile(fileKey)
    })
  )
  await house.remove()
  res.status(200).json({ id: req.params.id })
})

// @desc   Get house by id
// @route  GET /api/houses/:id
// @access Private
const getHouseById = asyncHandler(async (req, res) => {
  const house = await House.findById(
    req.params.id
  ).populate("author")
  res.status(200).json(house)
})

module.exports = {
  getHouses,
  setHouse,
  updateHouse,
  deleteHouse,
  getHouseById
}
