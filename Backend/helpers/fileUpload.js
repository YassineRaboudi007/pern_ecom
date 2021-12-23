const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public",
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });
module.exports = upload;
