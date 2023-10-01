const mongoose = require("mongoose")
const Location = require("./locationSchema")

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDescription: String,
  eventDateTime: Date,
  eventAddress: String,
  eventLocation: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  eventAreasOfWork: [String],
  eventVolunteers: {
    type: [mongoose.Schema.Types.ObjectId],
  },
})

eventSchema.index({ eventLocation: "2dsphere" })

const event = mongoose.model("event", eventSchema)

module.exports = event
