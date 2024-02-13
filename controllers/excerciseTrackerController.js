const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Exercise = require("../models/Exercise");
const { default: mongoose } = require("mongoose");

exports.users_post = [
  body("username").trim().isString().isLength({ min: 4 }).escape(),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500);
      res.json({ error: "invalid username" });
    }

    const exists = await User.find({ username: req.body.username });

    if (!exists.length) {
      const user = new User({ username: req.body.username });
      await user.save();
      res.json({ _id: user._id, username: user.username });
    } else {
      res.json({ error: "User already exists" });
    }
  },
];

exports.users_get = async function (req, res, next) {
  const result = await User.find();
  if (result.length > 0) {
    const users = result.map((user) => {
      return { _id: user._id, username: user.username };
    });
    res.json(users);
    return;
  }
  res.json({});
};

exports.excercises_post = [
  body("description").trim().escape(),
  body("duration").trim().escape(),
  body("date").trim().escape(),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: "invalid data" });
      return;
    }
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.json({ error: "invalid id" });
      return;
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      res.json({ error: "invalid id" });
      return;
    }
    const excercise = new Exercise({
      description: req.body.description,
      duration: req.body.duration,
      date: !req.body.date ? new Date() : new Date(req.body.date),
    });
    await excercise.save();
    user.log.push(excercise._id);
    await user.save();
    const { description, duration, date } = excercise;
    res.json({
      username: user.username,
      _id: user._id,
      description,
      duration,
      date: new Date(date).toDateString(),
    });
  },
];

exports.logs_get = async function (req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.json({ error: "invalid id" });
    return;
  }

  let query = null;
  if (req.query.from && req.query.to) {
    query = {
      date: {
        $gte: new Date(req.query.from),
        $lte: new Date(req.query.to),
      },
    };
  }

  let userQuery = User.findOne({ _id: req.params.id }).populate({
    path: "log",
    match: query,
    options: { limit: req.query.limit > 0 ? Number(req.query.limit) : null },
  });

  const user = await userQuery.exec();

  if (!user) {
    res.json({ error: "user not found" });
    return;
  }
  const { username, count, _id, log } = user;
  const filteredLog = log.map((exercise) => ({
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date.toDateString(),
  }));
  res.json({ username, count, _id, log: filteredLog });
};
