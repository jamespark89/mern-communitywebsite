const mongoose = require("mongoose")
const Schema = mongoose.Schema

const houseSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    totalBedrooms: { type: String, required: true },
    totalBathrooms: { type: String, required: true },
    bedType: { type: String, required: true },
    contents: { type: String, required: true },
    price: { type: String, require: true },
    gender: { type: String, require: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    houseImage: {
      type: [],
      required: true
    }
  },
  { timestamps: true }
)

const House = mongoose.model("House", houseSchema)

module.exports = House
