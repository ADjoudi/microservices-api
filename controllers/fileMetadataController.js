const multer = require("multer");
const upload = multer();
const path = require("path");

exports.file_get = function (req, res, next) {
  res.sendFile("fileMetadataForm.html", {
    root: path.join(__dirname, "../public"),
  });
};
exports.file_post = [
  upload.single("upfile"),
  function (req, res, next) {
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
