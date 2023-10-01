const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
    index: "2dsphere",
  },
})

const Location = mongoose.model("Location", locationSchema)

module.exports = Location
