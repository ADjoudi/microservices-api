const mongoose = require("mongoose");

const ShortUrlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String,
});

module.exports = mongoose.model("ShortUrl", ShortUrlSchema);
