const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/assets/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() +
      path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single('image');

const multipleUpload = multer({
  storage: storage
}).array('multipleImage', 10);

const videoUpload = multer({
  storage: storage
}).any();

module.exports = {
  upload, multipleUpload, videoUpload
};