/* eslint-disable no-undef */
const profileModel = require('../models/profile')

// Create and Save a new Note
// Create and Save a new Note


// Retrieve and return all  from the database.
exports.findAll = (req, res) => {
	profileModel.find()
		.then(profiles => {
			res.send(profiles)
		}).catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving profiles.'
			})
		})
}

// Find a single profile with Id
exports.findOne = (req, res) => {
	profileModel.find({ userId: req.params.profileId })
		.then(profile => {
			if (!profile) {

				return res.status(404).send({
					message: 'Profile not found with id ' + req.params.profileId
				})

			}

			res.send(profile)
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				console.log(BLAA1)
				return res.status(404).send({
					message: 'Profile not found with id ' + req.params.profileId
				})
			}
			return res.status(500).send({
				message: 'Error retrieving profile with id ' + req.params.profileId
			})
		})
}

// Update a profile identified by the Id in the request
exports.update = (req, res) => {
	// Validate Request
	if (!req.body) {

		return res.status(400).send({
			message: 'Profile content can not be empty'
		})
	}

	const { name, email, birth, country, status } = req.body

	// Find note and update it with the request body
	profileModel.findOneAndUpdate({ userId: req.params.profileId }, {
		name: name,
		birth: birth,
		email: email,
		country: country,
		status: status,
	}, { new: true })
		.then(profile => {
			if (!profile) {
				return res.status(404).send({
					message: 'Profile not found with id ' + req.params.profileId
				})
			}
			res.send(profile)
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Profile not found with id ' + req.params.profileId
				})
			}
			return res.status(500).send({
				message: 'Error updating profile with id ' + req.params.profileId
			})
		})
}



/* exports.updateRooms = (req, res) => {



}

exports.updateFriends = (req, res) => {



}
 */
// Delete a profile with the specified Id in the request
exports.delete = (req, res) => {
	profileModel.findOneAndDelete({ userId: req.params.profileId })
		.then(profile => {
			if (!profile) {
				return res.status(404).send({
					message: 'Profile not found with id ' + req.params.profileId
				})
			}
			res.send({ message: 'Profile deleted successfully!' })
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: 'Profile not found with id ' + req.params.profileId
				})
			}
			return res.status(500).send({
				message: 'Could not delete profile with id ' + req.params.profileId
			})
		})
}



