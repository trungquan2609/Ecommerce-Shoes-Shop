const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/storage');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

// const fileFilter = function(req, file, cb) {
//     if (file.mimetype === 'xlsx' || file.mimetype === 'xls') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

const uploadFileExcel = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
    // fileFilter: fileFilter
})

module.exports = uploadFileExcel;