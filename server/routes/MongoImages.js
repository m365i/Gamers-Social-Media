var express = require('express')
var router = express.Router()
var GridFsStream = require('gridfs-stream')
//------------------------getting profile id from mongo db--------
let gfs

const upload = require('../controllers/upload_middleware')
var mongoose = require('mongoose')
var mongoConnection = 'mongodb://' + ((process.env.DB_USER && process.env.DB_USER !== '') ? (process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@') : '') + process.env.DB_HOST + '/' + process.env.DB_NAME + '?authSource=admin'
if (process.env.DB_CONNECTION_STRING && process.env.DB_CONNECTION_STRING !== '') {
    mongoConnection = process.env.DB_CONNECTION_STRING
}
var mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connect = mongoose.createConnection(mongoConnection, mongoOptions)

connect.once('open', () => {
    // The monitoring database is turned on, and the file access control is carried out through gridfs-stream middleware and the database
    gfs = GridFsStream(connect.db, mongoose.mongo)
    gfs.collection('photos')

})

router.get('/get_img/:user_id', async (req, res) => {
    await gfs.files.findOne({ filename: `${req.params.user_id}-profileIMG` }, (err, file) => {
        if (!file || file.length === 0) {
            return res.send({ err: 'No File Exists' })
        } else {
            // Check if is image
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {


                var read_stream = gfs.createReadStream(file.filename)

                let file_buff = []
                read_stream.on('data', function (chunk) {
                    file_buff.push(chunk)
                })
                read_stream.on('error', e => {
                    console.log(e)

                })
                return read_stream.on('end', function () {
                    file_buff = Buffer.concat(file_buff)
                    const img = `data:image/png;base64,${Buffer(file_buff).toString('base64')}`
                    res.send(img)

                })


            } else {
                res.send({ err: 'Not and image' })
            }
        }
    })
})


//-----------------------------------------------------------------
//upload profile img
router.post('/upload_img/:user_id', async (req, res) => {

    gfs.files.findOne({ filename: `${req.params.user_id}-profileIMG` }, (err, file) => {
        if (file) {
            gfs.files.removeOne({ _id: file._id })
        }
    })

    try {
        console.log(req.body)
        await upload(req, res)



        console.log(`USER ID IS ${req.params.user_id}`)
        if (req.file === undefined) {
            return res.send('You must select a file.')
        }

        return res.send('File has been uploaded.')
    } catch (error) {
        console.log(error)
        return res.send(`Error when trying upload image: ${error}`)
    }

})

module.exports = router