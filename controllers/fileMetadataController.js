const multer = require("multer");
const upload = multer();

exports.file_post = [
  upload.single("upfile"),
  function (req, res, next) {
    const { originalname, mimetype, size } = req.file;
    res.json({ name: originalname, type: mimetype, size });
  },
];
