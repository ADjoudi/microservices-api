const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const ShortUrl = require("../models/shorturl");
const { v4 } = require("uuid");

/* timestamp endpoint */
router.get("/timestamp/api/:date?", function (req, res, next) {
  if (/^\d+$/.test(req.params.date)) {
    req.params.date = parseInt(req.params.date);
  }
  const date = req.params.date ? new Date(req.params.date) : new Date();
  if (date == "Invalid Date") {
    res.status(400);
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString(),
    });
  }
});

/* Request Header Parser */
router.get("/rhp/api/whoami", function (req, res, next) {
  const ipaddress = req.ip;
  const language = req.get("accept-language");
  const software = req.get("user-agent");

  res.json({ ipaddress, language, software });
});

/* URL Shortener */
router.post("/shortener/api/shorturl", [
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
]);

router.get(
  "/shortener/api/shorturl/:shorturl",
  async function (req, res, next) {
    const url = await ShortUrl.findOne({ short_url: req.params.shorturl });
    res.redirect(url.original_url);
  }
);

module.exports = router;
