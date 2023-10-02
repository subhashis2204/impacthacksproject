const router = require("express").Router()

const axios = require("axios")

const Vol = require("../models/volSchema")
const Event = require("../models/eventSchema")
const User = require("../models/userSchema")

require("dotenv").config()

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

router.get("/", async (req, res) => {
  const { username } = req.query
  console.log(username)
  let requiredVol = await Vol.findOne({ username }).populate("volEvents")
  const { volEvents } = requiredVol
  const modifiedEvents = serializeEvents(volEvents)

  requiredVol = {
    ...requiredVol._doc,
    volEvents: modifiedEvents,
  }

  const interestedEvents = await Event.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: requiredVol.volLocation.coordinates,
        },
        distanceField: "dist",
        spherical: true,
      },
    },
  ])

  const filteredEvents = serializeEvents(interestedEvents)

  const response = {
    ...requiredVol,
    interested: [...filteredEvents],
  }

  res.send(response)
})

router.post("/signup", async (req, res) => {
  const { username, volName, volInterests, volAddress } = req.body
  const newVol = new Vol({ username, volName, volInterests })

  const { data } = await axios.get(process.env.GEOURL, {
    params: {
      key: process.env.GEOKEY,
      q: volAddress,
      limit: 1,
    },
  })

  const { lat, lng } = data.results[0].geometry

  newVol.volLocation = {
    type: "Point",
    coordinates: [lng, lat],
  }
  const newUser = new User({ username, userType: "volunteer" })

  await newVol.save()
  await newUser.save()

  res.send(newVol)
})

router.post("/event/signup", async (req, res) => {
  const { username, eventId } = req.body
  const requiredVol = await Vol.findOne({ username })
  const requiredEvent = await Event.findById(eventId)

  requiredVol.volEvents.push(eventId)
  requiredEvent.eventVolunteers.push(requiredVol._id)

  await requiredVol.save()
  await requiredEvent.save()

  res.send("event added")
})

module.exports = router
