const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
