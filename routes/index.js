var express = require("express");
var router = express.Router();

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

module.exports = router;
