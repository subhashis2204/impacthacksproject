const mongoose = require("mongoose")

const orgSchema = new mongoose.Schema({
  username: String,
  orgName: String,
  orgDescription: String,
  orgAreasOfWork: [String],
  orgEvents: {
    type: [mongoose.types.ObjectId],
  },
})

const Org = mongoose.model("Org", orgSchema)
module.exports = Org
