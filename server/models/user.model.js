const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    googleId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, required: true }
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User
