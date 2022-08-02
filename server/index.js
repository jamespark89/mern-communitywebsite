require("dotenv").config()
console.log(process.env.MONGO_DB)
// index.js
var path = require("path")
var express = require("express")
var mongoose = require("mongoose")
var app = express()

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
app.use(
  "/",
  express.static(
    path.join(__dirname, "..", "/client/public")
  )
)
app.use(
  "/",
  express.static(path.join(__dirname, "..", "/client/src"))
)

// Port setting
var port = 3000
app.listen(port, function () {
  console.log("server on! http://localhost:" + port)
})
