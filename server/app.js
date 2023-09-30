const express = require("express")
const app = express()
const session = require("express-session")
const mongoose = require("mongoose")
const volRouter = require("./routes/volRoutes")
const orgRouter = require("./routes/orgRoutes")

mongoose
  .connect("mongodb://localhost:27017/express-auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!")
  })
  .catch((error) => {
    console.log("Connection failed!")
    console.log(error)
  })

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/orgs", orgRouter)
app.use("/vol", volRouter)

app.listen(3000, () => {
  console.log("Example app listening on port 3000!")
})
