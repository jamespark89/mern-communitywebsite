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
const Redis = require("ioredis")
let redis = new Redis({
  host: "redis-18575.c296.ap-southeast-2-1.ec2.cloud.redislabs.com",
  port: 18575,
  password: process.env.REDIS_PASSWORD
})

connectDB()
//Passport
app.use(
  session({
    store: new RedisStore({ client: redis }),
    secret: process.env.MY_SECRET,
    name: "id",
    resave: false,
    rolling: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 60 * 60 * 1000
    },
    saveUninitialized: false
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
    origin: [`${process.env.BASE_URL}`],
    methods: ["GET,PUT,POST,DELETE,PATCH,OPTIONS"]
  })
)

// Routes
app.use("/api/users", require("./routes/users"))
app.use("/api/jobs", require("./routes/jobs"))
app.use("/api/houses", require("./routes/houses"))
app.use("/auth", require("./routes/auth"))
app.use("/tmp", express.static(path.join(__dirname, "tmp")))
app.get("/images/:key", async (req, res) => {
  const key = req.params.key
  const readStream = await getFileStream(key)
  res.setHeader("Content-type", "image/jpeg")
  res.setHeader("Connection", "keep-alive")
  res.setHeader("Keep-Alive", "timeout=5")
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
var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log("server on! http://localhost:" + port)
})
