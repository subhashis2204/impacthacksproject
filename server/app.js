const express = require("express")
const app = express()
const session = require("express-session")
const volRouter = require("./routes/volRoutes")
const orgRouter = require("./routes/orgRoutes")
const dbConnection = require("./db.config")
const User = require("./models/userSchema")
const cors = require("cors")
const Event = require("./models/eventSchema")

const sessionConfig = {
  secret: "my-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 },
}

const serializeEvents = (volEvents) => {
  const result = volEvents.map(
    ({
      _id,
      eventName,
      eventDateTime,
      eventAddress,
      eventDescription,
      eventAreasOfWork,
      eventVolunteers,
    }) => {
      const dateObject = new Date(eventDateTime)

      const year = dateObject.getFullYear()
      const month = String(dateObject.getMonth() + 1).padStart(2, "0") // Months are 0-based
      const day = String(dateObject.getDate()).padStart(2, "0")
      const hours = String(dateObject.getHours()).padStart(2, "0")
      const minutes = String(dateObject.getMinutes()).padStart(2, "0")

      const eventDate = `${year}-${month}-${day}`
      const eventTime = `${hours}:${minutes}`

      return {
        _id,
        eventName,
        eventDescription,
        eventDate,
        eventTime,
        eventAddress,
        eventAreasOfWork,
        eventVolunteers: eventVolunteers.length,
      }
    }
  )

  return result
}

dbConnection()
app.use(session(sessionConfig))
app.use(cors())

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

app.post("/events", async (req, res) => {
  const { lat, lng } = req.body

  console.log(lat, lng)
  const interestedEvents = await Event.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [Number(lng), Number(lat)],
        },
        distanceField: "dist",
        maxDistance: 100000,
        spherical: true,
      },
    },
  ])

  res.send(serializeEvents(interestedEvents))
})
app.use("/orgs", orgRouter)
app.use("/vol", volRouter)

app.listen(3000, () => {
  console.log("Example app listening on port 3000!")
})
