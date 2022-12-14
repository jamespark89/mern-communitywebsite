const mongoose = require("mongoose")
const Schema = mongoose.Schema

const jobSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    title: { type: String, required: true },
    contents: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
)

const Job = mongoose.model("Job", jobSchema)

module.exports = Job
