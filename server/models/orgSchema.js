const mongoose = require("mongoose")

const orgSchema = new mongoose.Schema({
  username: String,
  orgName: String,
  orgDescription: String,
  orgAreasOfWork: [String],
  orgEvents: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "event",
  },
})

const Org = mongoose.model("Org", orgSchema)
module.exports = Org
