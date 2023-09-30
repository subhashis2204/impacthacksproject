const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDescription: String,
  eventDateTime: Date,
  eventLocation: String,
  eventAreasOfWork: [String],
  eventVolunteers: {
    type: [mongoose.Schema.Types.ObjectId],
  },
})

const event = mongoose.model("event", eventSchema)

module.exports = event
