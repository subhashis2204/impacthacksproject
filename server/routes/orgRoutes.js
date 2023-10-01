const router = require("express").Router()
const Org = require("../models/orgSchema")
const Event = require("../models/eventSchema")
const axios = require("axios")
const User = require("../models/userSchema")

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

  const newUser = new User({
    username,
    userType: "org",
  })

  await newUser.save()
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
    eventAddress,
    eventAreasOfWork,
  } = req.body

  const requiredOrg = await Org.findOne({ username })
  const eventDateTime = new Date(`${eventDate}T${eventTime}:00Z`)

  const { data } = await axios.get(process.env.GEOURL, {
    params: {
      key: process.env.GEOKEY,
      q: eventAddress,
      limit: 1,
    },
  })

  const { lat, lng } = data.results[0].geometry

  const newEvent = new Event({
    eventName: eventName,
    eventDescription: eventDescription,
    eventDateTime: eventDateTime,
    eventAddress: eventAddress,
    eventAreasOfWork: eventAreasOfWork,
    eventVolunteers: [],
  })

  newEvent.eventLocation = {
    type: "Point",
    coordinates: [lng, lat],
  }

  await newEvent.save()

  requiredOrg.orgEvents.push(newEvent._id)
  await requiredOrg.save()

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
