const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDescription: String,
  eventDate: String,
  eventTime: String,
  eventLocation: String,
  eventAreasOfWork: [String],
  eventVolunteers: {
    type: [mongoose.types.ObjectId],
  },
})
