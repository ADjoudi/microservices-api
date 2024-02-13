const multer = require("multer");
const upload = multer();

exports.file_post = [
  upload.single("upfile"),
  function (req, res, next) {
    console.log(req.file);
    if (!req.file) {
      res.json({ error: "invalid input" });
      return;
    }
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  },
];
