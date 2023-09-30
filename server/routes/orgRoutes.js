const router = require("express").Router()
const Org = require("../models/orgSchema")
const Event = require("../models/eventSchema")

const serializeEvents = (orgEvents) => {
  const result = orgEvents.map(
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

  let requiredOrg = await Org.findOne({ username }).populate("orgEvents")

  const { orgEvents } = requiredOrg
  const modifiedEvents = serializeEvents(orgEvents)

  requiredOrg = {
    ...requiredOrg._doc,
    orgEvents: modifiedEvents,
  }

  res.send(requiredOrg)
})

router.post("/signup", async (req, res) => {
  const { username, orgName, orgDescription, orgAreasOfWork } = req.body

  const newOrg = new Org({
    username,
    orgName,
    orgDescription,
    orgAreasOfWork,
    orgEvents: [],
  })

  newOrg.save()

  res.send("new org created")
})

// router.get("/events", async (req, res) => {
//   const { username } = req.query
//   const requiredEvents = await Org.findOne(
//     { username },
//     { _id: 0, orgEvents: 1 }
//   ).populate("orgEvents")

//   const { orgEvents } = requiredEvents
//   const result = serializeEvents(orgEvents)

//   res.send(result)
// })

router.post("/events/new", async (req, res) => {
  const {
    username,
    eventName,
    eventDescription,
    eventDate,
    eventTime,
    eventLocation,
    eventAreasOfWork,
  } = req.body

  const requiredOrg = await Org.findOne({ username })
  const eventDateTime = new Date(`${eventDate}T${eventTime}:00Z`)

  const newEvent = new Event({
    eventName: eventName,
    eventDescription: eventDescription,
    eventDateTime: eventDateTime,
    eventLocation: eventLocation,
    eventAreasOfWork: eventAreasOfWork,
    eventVolunteers: [],
  })

  newEvent.save()

  requiredOrg.orgEvents.push(newEvent._id)
  requiredOrg.save()

  res.send("new event created")

  // console.log(
  //   eventName,
  //   eventDescription,
  //   eventLocation,
  //   eventAreasOfWork[0],
  //   eventDateTime
  // )
})

module.exports = router
