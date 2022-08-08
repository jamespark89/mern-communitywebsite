require("dotenv").config()

// index.js
const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

// DB setting
mongoose.connect(`${process.env.MONGO_DB}`)
var db = mongoose.connection
db.once("open", function () {
  console.log("DB connected")
})
db.on("error", function (err) {
  console.log("DB ERROR : ", err)
})

// Other settings
app.use(cors())
app.use(express.json())
app.use(
  "/",
  express.static(
    path.join(__dirname, "..", "/client/build")
  )
)

const exercisesRouter = require("./routes/exercises")
const usersRouter = require("./routes/users")
const jobsRouter = require("./routes/jobs")
app.use("/exercises", exercisesRouter)
app.use("/users", usersRouter)
app.use("/jobs", jobsRouter)

// Port setting
var port = 3001
app.listen(port, function () {
  console.log("server on! http://localhost:" + port)
})
