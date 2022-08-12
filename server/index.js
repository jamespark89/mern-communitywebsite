require("dotenv").config()
// index.js
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const passport = require("./config/passport")
const session = require("express-session")
const util = require("./util")

// DB setting
mongoose.connect(`${process.env.MONGO_DB}`)
var db = mongoose.connection
db.once("open", function () {
  console.log("DB connected")
})
db.on("error", function (err) {
  console.log("DB ERROR : ", err)
})

//Passport
app.use(
  session({
    secret: "MySecret",
    resave: false,
    cookie: {
      secure: false
    },
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Custom Middlewares
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.currentUser = req.user
  res.locals.util = util
  next()
})

//Other
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"]
  })
)
app.use(express.json())

// Routes
app.use("/users", require("./routes/users"))
app.use("/jobs", require("./routes/jobs"))
app.use("/auth", require("./routes/auth"))

var port = 3001
app.listen(port, function () {
  console.log("server on! http://localhost:" + port)
})
