const multer = require('multer');

const uploader = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../public/avatars')
        },
        filename: function (req, file, cb) {
            console.log(file)
            cb(null, `${file.fieldname}_${Date.now()}.${file.originalname.split('.')[1]}`)
        }
    })
})
module.exports = uploader