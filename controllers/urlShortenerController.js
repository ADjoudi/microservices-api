const { body, validationResult } = require("express-validator");
const { v4 } = require("uuid");
const ShortUrl = require("../models/shorturl");

exports.url_shortener_post = [
  body("url").trim().isLength({ min: 1 }).isURL(),
  async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
      res.json({ error: "invalid url" });
      return;
    }
    const short_url = v4();
    const shorturl = new ShortUrl({ original_url: req.body.url, short_url });
    await shorturl.save();

    res.json({ original_url: req.body.url, short_url });
  },
];

exports.url_shortener_get = async function (req, res, next) {
  const url = await ShortUrl.findOne({ short_url: req.params.shorturl });
  res.redirect(url.original_url);
};
