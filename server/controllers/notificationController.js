
const notificationModel = require('../models/notifications')



exports.findAll = (req, res) => {
    notificationModel.find()
        .then(notes => {
            res.send(notes)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving notes.'
            })
        })
}


exports.delete = (req, res) => {
    notificationModel.findOneAndDelete({ _id: req.params.NoteId })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: 'note not found with id ' + req.params.NoteId
                })
            }
            res.send({ message: 'Profile deleted successfully!' })
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'note not found with id ' + req.params.NoteId
                })
            }
            return res.status(500).send({
                message: 'Could not delete note with id ' + req.params.NoteId
            })
        })
}

exports.create = async (req, res) => {

    const { from_id, to_id, update, timestamp } = req.body
    let new_note = new notificationModel({ from_id: from_id, to_id: to_id, update: update, timestamp: timestamp })

    await new_note.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Tutorial.'
            })
        })

}