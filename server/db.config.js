const mongoose = require("mongoose")

module.exports = () => {
  return mongoose
    .connect("mongodb://localhost:27017/express-auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database!")
    })
    .catch((error) => {
      console.log("Connection failed!")
      console.log(error)
    })
}
