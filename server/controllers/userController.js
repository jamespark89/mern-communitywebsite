const User = require("../models/user.model")
const asyncHandler = require("express-async-handler")

const registerGoogleUser = asyncHandler(
  async (req, res) => {
    const googleId = req.id
    const username = req.displayName
    const email = req.emails[0].value
    const picture = req.photos[0].value
    const newUser = new User({
      googleId,
      username,
      email,
      picture
    })
    await newUser.save()
    return newUser
  }
)

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) return res.status(400)
  res.status(200).json(user)
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})

module.exports = { registerGoogleUser, getMe, getUsers }
