const express = require("express")
const app = express()
const session = require("express-session")
const volRouter = require("./routes/volRoutes")
const orgRouter = require("./routes/orgRoutes")
const dbConnection = require("./db.config")
const User = require("./models/userSchema")
const cors = require("cors")

const sessionConfig = {
  secret: "my-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
}

dbConnection()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.post("/login", async (req, res) => {
  const { username } = req.body
  const requiredUser = await User.findOne({ username })

  res.send(requiredUser)
})

app.use(session(sessionConfig))
app.use(cors())
app.use("/orgs", orgRouter)
app.use("/vol", volRouter)

app.listen(3000, () => {
  console.log("Example app listening on port 3000!")
})
