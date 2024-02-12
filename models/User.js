const mongoose = require("mongoose");

const UserShcema = new mongoose.Schema({
  username: { type: String, required: true },
  log: [{ type: mongoose.Types.ObjectId, ref: "Exercise" }],
});

UserShcema.virtual("count").get(function () {
  return this.log ? this.log.length : 0;
});

module.exports = mongoose.model("User", UserShcema);
