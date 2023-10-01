const router = require("express").Router()

const Vol = require("../models/volSchema")
const Event = require("../models/eventSchema")
const User = require("../models/userSchema")

const serializeEvents = (volEvents) => {
  const result = volEvents.map(
    ({
      eventName,
      eventDateTime,
      eventLocation,
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
        eventName,
        eventDescription,
        eventDate,
        eventTime,
        eventLocation,
        eventAreasOfWork,
        eventVolunteers: eventVolunteers.length,
      }
    }
  )

  return result
}

router.get("/", async (req, res) => {
  const { username } = req.query
  let requiredVol = await Vol.findOne({ username }).populate("volEvents")
  const { volEvents } = requiredVol
  const modifiedEvents = serializeEvents(volEvents)

  requiredVol = {
    ...requiredVol._doc,
    volEvents: modifiedEvents,
  }

  const events = await Event.find({ eventDateTime: { $gte: new Date() } })
    .sort({ eventDateTime: 1 })
    .limit(3)

  console.log(events)

  res.send(requiredVol)
})

router.post("/signup", async (req, res) => {
  const { username, volName, volInterests } = req.body
  const newVol = new Vol({
    username,
    volName,
    volInterests,
  })

  await newVol.save()

  const newUser = new User({
    username,
    userType: "volunteer",
  })

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
