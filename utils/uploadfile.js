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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Default destination directory
        let uploadDir = 'public/uploads'; 

        // if (req.body.fieldName === 'profilePicture') {
        //     // Subdirectory for profile pictures
        //     uploadDir += '/profiles'; 
        // } else if (req.body.fieldName === 'petPicture') {
        //     // Subdirectory for pet pictures
        //     uploadDir += '/pets'; 
        // }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const maxSize = 1 * 1000 * 1000;

const uploadFile = multer({
    storage: storage,
    limits: {fileSize: maxSize},
    fileFilter: imageFilter,
    onError: function(err, next) {
        return console.log('error', err);
        next(err);
    }

});

module.exports = uploadFile;