/* eslint-disable no-undef */
const profileModel = require('../models/profile')

// Create and Save a new Note
// Create and Save a new Note


//add new friend 
exports.AddFriend = async (req, res) => {
	const userID = req.body.userID

	const friend_to_add = await profileModel.findOne({ userId: req.body.FriendID })

	const my_profile = await profileModel.findOne({ userId: userID })


	for (let friend of my_profile.friends) {
		if (String(friend) === String(friend_to_add._id)) {
			return res.send('Friend Already Added Dont Add Him Again')
		}
	}

	//friend is mutual so friend both of the users
	profileModel.findOneAndUpdate({ userId: userID }, { $addToSet: { friends: friend_to_add.userId } }).then(res => {

		// console.log(res);
	}

	)

	profileModel.findOneAndUpdate({ userId: friend_to_add.userId }, { $addToSet: { friends: userID } }).then(res => {

		//console.log(res);
	})

	return res.send('Friend  Added ')
}

//delete friend
exports.DeleteFriend = async (req, res) => {
	console.log(req.body)
	const friend_to_delete = req.body.friend_id_to_delete
	const userID = req.body.userID

	profileModel.findOneAndUpdate({ userId: userID }, { $pull: { friends: friend_to_delete } }).then(res => {
		// console.log(res);
	})

	profileModel.findOneAndUpdate({ userId: friend_to_delete }, { $pull: { friends: userID } }).then(res => {
		//console.log(res);
	})

	return res.send('Friend  Deleted ')


}