const House = require("../models/house.model")
const asyncHandler = require("express-async-handler")
const User = require("../models/user.model")
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
  const houseImageFilesPath = req.files.map(
    (item) => item.path
  )
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
    houseImage: houseImageFilesPath
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
