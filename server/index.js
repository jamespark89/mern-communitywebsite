require("dotenv").config()
// index.js
const express = require("express")
const app = express()
const cors = require("cors")
const passport = require("./config/passport")
const session = require("express-session")
const util = require("./middleware/util")
const connectDB = require("./config/db")
const {
  errorHandler
} = require("./middleware/errorMiddleware")

connectDB()
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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    credentials: true,
    origin: [process.env.BASE_URL],
    methods: ["GET,PUT,POST,DELETE,PATCH,OPTIONS"]
  })
)

// Routes
app.use("/api/users", require("./routes/users"))
app.use("/api/jobs", require("./routes/jobs"))
app.use("/api/houses", require("./routes/houses"))
app.use("/auth", require("./routes/auth"))
app.use("/uploads", express.static("uploads"))
app.use(errorHandler)
var port = 3001
app.listen(port, function () {
  console.log("server on! http://localhost:" + port)
})
