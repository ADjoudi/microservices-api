const express = require("express");
const router = express.Router();

const timestampController = require("../controllers/timestampController");
const requestHeaderParserController = require("../controllers/requestHeaderParserController");
const urlShortenerController = require("../controllers/urlShortenerController");
const excerciseTrackerController = require("../controllers/excerciseTrackerController");

/* timestamp endpoint */
router.get("/timestamp/api/:date?", timestampController.timestamp_get);

/* Request Header Parser */
router.get(
  "/rhp/api/whoami",
  requestHeaderParserController.request_header_parser_get
);

/* URL Shortener */
router.post(
  "/shortener/api/shorturl",
  urlShortenerController.url_shortener_post
);
router.get(
  "/shortener/api/shorturl/:shorturl",
  urlShortenerController.url_shortener_get
);

/* Exercise Tracker */
router.get("/excercise/api/users", excerciseTrackerController.users_get);
router.post("/excercise/api/users", excerciseTrackerController.users_post);

router.post(
  "/excercise/api/users/:id/excercises",
  excerciseTrackerController.excercises_post
);

router.get(
  "/excercise/api/users/:id/logs",
  excerciseTrackerController.logs_get
);
module.exports = router;
