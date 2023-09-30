const router = require("express").Router()

const Vol = require("../models/volSchema")

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

  res.send(newVol)
})

router.post("/event/signup", async (req, res) => {
  const { username, eventId } = req.body

  const requiredVol = await Vol.findOne({ username })
  requiredVol.volEvents.push(eventId)

  await requiredVol.save()

  res.send("event added")
})

module.exports = router
