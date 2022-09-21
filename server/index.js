require("dotenv").config()
// index.js
const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")
const passport = require("./config/passport")
const session = require("express-session")
const util = require("./middleware/util")
const connectDB = require("./config/db")
const {
  errorHandler
} = require("./middleware/errorMiddleware")
const { getFileStream } = require("./middleware/s3")
let RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")
let redisClient = createClient({
  legacyMode: true,
  url:
    process.env.NODE_ENV === "production"
      ? process.env.REDIS_URL
      : "redis://localhost:6379"
})

redisClient.connect().catch(console.error)

connectDB()
//Passport
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.MY_SECRET,
    name: "id",
    resave: false,
    rolling: true,
    cookie: {
      httpOnly: false,
      secure:
        process.env.NODE_ENV === "production"
          ? true
          : false,
      maxAge: 60 * 60 * 1000
    }
    // saveUninitialized: false
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
    origin: ["http://localhost:3000"],
    methods: ["GET,PUT,POST,DELETE,PATCH,OPTIONS"]
  })
)

// Routes
app.use("/api/users", require("./routes/users"))
app.use("/api/jobs", require("./routes/jobs"))
app.use("/api/houses", require("./routes/houses"))
app.use("/auth", require("./routes/auth"))
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
)
app.get("/images/:key", async (req, res) => {
  const key = req.params.key
  const readStream = await getFileStream(key)
  readStream.pipe(res)
})
// serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../client/build"))
  )
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(
        __dirname,
        "../",
        "client",
        "build",
        "index.html"
      )
    )
  )
} else {
  app.get("/", (req, res) =>
    res.send("Please set to production")
  )
}

app.use(errorHandler)
var port = process.env.PORT || 4000
app.listen(port, function () {
  console.log("server on! http://localhost:" + port)
})
