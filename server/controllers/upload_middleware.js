const dotenv = require('dotenv')
const util = require('util')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
dotenv.config()

var mongoose = require('mongoose')
var mongoConnection = 'mongodb://' + ((process.env.DB_USER && process.env.DB_USER !== '') ? (process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@') : '') + process.env.DB_HOST + '/' + process.env.DB_NAME + '?authSource=admin'
if (process.env.DB_CONNECTION_STRING && process.env.DB_CONNECTION_STRING !== '') {
  mongoConnection = process.env.DB_CONNECTION_STRING
}
var mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}


var storage = new GridFsStorage({
  url: mongoConnection,
  options: mongoOptions,
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg']

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-profileIMG-${file.originalname}`
      return filename
    }

    //photos.files
    //photos.chunks
    return {
      bucketName: 'photos',
      filename: `${req.params.user_id}-profileIMG`,
    }
  }
})

var uploadFile = multer({ storage: storage }).single('file')

var uploadFilesMiddleware = util.promisify(uploadFile)
module.exports = uploadFilesMiddleware