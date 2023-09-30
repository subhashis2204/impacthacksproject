const mongoose = require("mongoose")

const volSchema = new mongoose.Schema({
  username: String,
  volName: String,
  volInterests: [String],
  volEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
  ],
})

const Vol = mongoose.model("Vol", volSchema)
module.exports = Vol
