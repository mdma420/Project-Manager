const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  // Thư mục lưu trữ file
  destination: function (req, file, cb) {
    // Tạo đường dẫn đầy đủ cho thư mục lưu trữ của avatar đó
    var path = "uploads/student/";
    // Tạo thư mục nếu chưa tồn tại
    fs.mkdirSync(path, {recursive: true});
    cb(null, path);
  },
  // Đặt tên file
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage: storage});

// var storage = multer.diskStorage({
//   // Thư mục lưu trữ file
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   // Đặt tên file
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

module.exports = {upload};
