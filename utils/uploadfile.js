const multer = require("multer");
const path = require("path");

const imageFilter = (req, file, cb) => {
    var filetypes = /jpeg|jpg|png/;

    var mimetype = filetypes.test(file.mimetype);
  
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname){
        cb(null, true);
    } else {
        cb("Please upload only the following filetypes - " + filetypes, false);
    }
};

const storage = (destination) => multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`+ path.extname(file.originalname));
    },
});

const maxSize = 1 * 1000 * 1000;

const uploadFile = (destination) => multer({
    storage: storage(destination),
    limits: {fileSize: maxSize},
    fileFilter: imageFilter,
    onError: function(err, next) {
        return console.log('error', err);
        next(err);
    }

}).single('image');

module.exports = uploadFile;