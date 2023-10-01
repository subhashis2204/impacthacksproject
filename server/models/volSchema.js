const mongoose = require("mongoose")

const Location = require("./locationSchema")

const volSchema = new mongoose.Schema({
  username: String,
  volName: String,
  volInterests: [String],
  volLocation: {
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
  volEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
  ],
})

const Vol = mongoose.model("Vol", volSchema)
module.exports = Vol
