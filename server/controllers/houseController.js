const House = require("../models/house.model")
const asyncHandler = require("express-async-handler")
const fs = require("fs")
const {
  uploadFile,
  deleteFile
} = require("../middleware/s3")

// @desc   Get houses
// @route  GET /api/houses
// @access Private
const getHouses = asyncHandler(async (req, res) => {
  const page = req.query.page
  let totalCount = 0
  const limit =
    req.query.limit == "undefined" ? 0 : req.query.limit
  const userId =
    req.query.userId == "undefined" ||
    req.query.userId == "null"
      ? undefined
      : req.query.userId
  let houses = []

  if (!userId) {
    houses = await House.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort("-createdAt")
    totalCount = await House.collection.countDocuments()
  } else {
    houses = await House.find({ author: userId })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort("-createdAt")

    const filteredHouse = await House.find({
      author: userId
    })
    totalCount = filteredHouse.length
  }
  res.status(200).json({ houses, totalCount })
})

// @desc   Set house
// @route  POST /api/houses
// @access Private
const setHouse = asyncHandler(async (req, res) => {
  const resizedFiles = req.body.images
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
  //upload resized image to S3 and then delete the temp files
  const houseImageFiles = await Promise.all(
    resizedFiles.map(async (file) => {
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
  const files = req.files
  const resizedFiles = req.body.images
  const house = await House.findById(req.params.id)
  if (!house) {
    res.status(400)
    throw new Error("House not found")
  }
  //delete prev file images from S3
  house.houseImage.forEach(
    async (fileKey) => await deleteFile(fileKey)
  )
  //upload resized images to S3
  const houseImageFiles = await Promise.all(
    resizedFiles.map(async (file) => {
      const result = await uploadFile(file)
      fs.unlinkSync(`${file.path}`)
      return result.Key
    })
  )
  //update DB
  const updatedHouse = await House.findByIdAndUpdate(
    req.params.id,
    {
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
    },
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
