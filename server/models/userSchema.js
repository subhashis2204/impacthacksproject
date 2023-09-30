const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: String,
  role: {
    type: String,
    enum: ["org", "volunteer"],
    default: "volunteer",
  },
})

const User = mongoose.model("User", userSchema)
module.exports = User
