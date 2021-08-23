

//import React, { useState, useEffect } from 'react'
import React, { useEffect, useState } from 'react'
import { selectUser } from '../state/userSlice'
import { useSelector } from 'react-redux'
import axios from '../services/axios.config'
import $ from 'jquery'
import './members.css'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { FaEdit, FaSave, FaWindowClose, FaUserFriends } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import AllUsersModal from '../components/AllUsersModal'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

//import { get_all_profiles } from '../services/ProfileAPI'
export default function Members() {


	const [Carouselitems, SetCarouselitems] = useState([])
	const [all_profiles_list, set_profiles_list] = useState([])
	const { user } = useSelector(selectUser)
	const [userProfile, SetuserProfile] = useState(null)
	//const [FriendFocused, SetFriendFocused] = useState(null)
	const [dataFetched, SetdataFetch] = useState(false)
	const [isOpen, SetisOpen] = useState(false)

	
	const fetchData = async () => {
		await axios.get(`profiles/profile/${user.id}`).then((res) => {
			//console.log(res.data[0])
			SetuserProfile(res.data[0])

		})

		await axios.get('/profiles/all_profiles').then((all_profiles) => {
			set_profiles_list(all_profiles.data)
			//console.log(all_profiles_list)
		})

		SetdataFetch(true)

	}



	useEffect(() => {
		fetchData()


		if (dataFetched) {
			InsertDataToForm()
			SetImage_PreView()

		}

		// eslint-disable-next-line 
	}, [dataFetched])

	function SetImage_PreView() {
		let imagesPreview = function (input, placeToInsertImagePreview) {
			if (input.files) {
				let reader = new FileReader()
				reader.onload = function (event) {
					$($.parseHTML('<img>'))
						.attr('src', event.target.result)
						.attr('id', 'image-preview1')
						.css('width', '200px')
						.appendTo(placeToInsertImagePreview)
				}
				reader.readAsDataURL(input.files[0])
				//console.log(input.files);
			}

		}


		$('#img_upload_input').on('change', function () {
			$('div.preview-images').empty()
			imagesPreview(this, 'div.preview-images')

		})

		axios.get(`/profile/img/get_img/${user.id}`).then(res => {
			//console.log("Profile Image Loaded");
			//console.log(res)
			$('#current_profile_img').val('<img>')
				.attr('src', res.data)
				.css('width', '200px')
		})

	}


	function UploadImageClick(event) {
		event.preventDefault()

		var formData = new FormData()
		var imagefile = document.querySelector('#img_upload_input')
		formData.append('file', imagefile.files[0])
		console.log(formData.get('file'))
		axios.post(`/profile/img/upload_img/${user.id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then((res) => console.log(res))

	}


	function UpdateProfileClicked(e) {

		UploadImageClick(e)
	}

	function OpenInput() {

		$('#img_upload_input').click()
		$('#image-preview1').show()
		$('#current_profile_img').hide()
	}

	function OpenEditName() {
		$('#name_lable').hide()
		$('#edit_name').css('display', 'block')
		$('#edit_name').val(userProfile.name)
		$('#save_name_icon').css('display', 'block')
		$('#close_name_icon').css('display', 'block')
	}

	function SaveNewName() {
		userProfile.name = $('#edit_name').val()

		axios.put(`profiles/profile/${user.id}`, userProfile).then(() => {
			$('#name_lable').text(userProfile.name)
		})

		$('#name_lable').show()

		$('#edit_name').hide()
		$('#save_name_icon').hide()
		$('#close_name_icon').hide()
	}

	function CloseNameEdit() {
		$('#name_lable').show()
		$('#edit_name').hide()
		$('#save_name_icon').hide()
		$('#close_name_icon').hide()
	}

	function OpenEditEmail() {
		$('#email_lable').hide()
		$('#edit_email').css('display', 'block')
		$('#edit_email').val(user.email)
		$('#save_email_icon').css('display', 'block')
		$('#close_email_icon').css('display', 'block')
	}

	function SaveNewEmail() {
		userProfile.email = $('#edit_email').val()
		//maybe add validation
		axios.put(`profiles/profile/${user.id}`, userProfile).then(() => {
			$('#email_lable').text('Email: ' + userProfile.email)
		})


		$('#email_lable').show()
		$('#edit_email').hide()
		$('#save_email_icon').hide()
		$('#close_email_icon').hide()
	}

	function CloseEmailEdit() {
		$('#email_lable').show()
		$('#edit_email').hide()
		$('#save_email_icon').hide()
		$('#close_email_icon').hide()
	}

	function OpenEditAge() {
		$('#age_lable').hide()
		$('#birthdate_label').hide()
		$('#edit_age').css('display', 'block')
		$('#edit_age').val(userProfile.birth)
		$('#save_age_icon').css('display', 'block')
		$('#close_age_icon').css('display', 'block')
	}

	function calcAge() {
		if (userProfile.birth !== null) {
			//console.log(new Date(userProfile.birth).getFullYear())
			let curr_year = new Date().getFullYear()
			let chosen = new Date(userProfile.birth).getFullYear()
			return (curr_year - chosen)
		}
		return 0
	}

	function SaveNewAge() {
		//console.log($('#edit_age').val())
		userProfile.birth = new Date($('#edit_age').val())
		//console.log(userProfile.birth)
		//maybe add validation
		axios.put(`profiles/profile/${user.id}`, userProfile).then(() => {
			$('#birthdate_label').text('Birthdate: ' + userProfile.birth.toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem' }).replace(/\D/g, '/'))
		})

		$('#age_lable').text('Age: ' + calcAge())
		$('#age_lable').show()
		$('#birthdate_label').show()
		$('#edit_age').hide()
		$('#save_age_icon').hide()
		$('#close_age_icon').hide()

	}

	function CloseAgeEdit() {
		$('#age_lable').show()
		$('#edit_age').hide()
		$('#save_age_icon').hide()
		$('#close_age_icon').hide()
		$('#birthdate_label').show()
	}

	function OpenEditCountry() {
		$('#Country_lable').hide()
		$('#edit_Country').css('display', 'block')
		$('#edit_Country').val(userProfile.country)
		$('#save_country_icon').css('display', 'block')
		$('#close_country_icon').css('display', 'block')

	}

	function SaveNewCountry() {

		userProfile.country = $('#edit_Country').val()
		//console.log(userProfile.birth)
		//maybe add validation
		axios.put(`profiles/profile/${user.id}`, userProfile).then(() => {
			$('#Country_lable').text('Country: ' + userProfile.country)
		})


		$('#Country_lable').show()
		$('#edit_Country').hide()
		$('#save_country_icon').hide()
		$('#close_country_icon').hide()
	}

	function CloseCountryEdit() {
		$('#Country_lable').show()
		$('#edit_Country').hide()
		$('#save_country_icon').hide()
		$('#close_country_icon').hide()
	}

	function InsertDataToForm() {

		$('#name_lable').text(userProfile.name)
		$('#email_lable').text('Email: ' + userProfile.email)
		$('#birthdate_label').text('BirthDate: ' + new Date(userProfile.birth).toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem' }).replace(/\D/g, '/'))
		$('#age_lable').text('Age: ' + String(calcAge()))
		$('#Country_lable').text('Country: ' + userProfile.country)


		let friends_names = []
		//console.log(messages_list)
		for (let i = 0; i < userProfile.friends.length; i++) {
			const friend_id = userProfile.friends[i]
			var friend_profile = all_profiles_list.find(obj => {
				return obj.userId == friend_id
			})
			friends_names[i] = (friend_profile.name)
			//console.log(friends_names)
			axios.get(`/profile/img/get_img/${friend_id}`).then(img => {
				SetCarouselitems(Carouselitems =>
					[...Carouselitems, <div key={i}>
						<label key={i} >{friends_names[i]}</label>
						<img src={img.data} />
					</div>])
			})
		}





	}

	$(document).ready(function () {
		$('.carousel.carousel-slider .control-arrow').click()
	})





	function ActionFriendClicked(friend_Id, action) {
		if (action == 1) {
			axios.put('/friends_profiles/add_friend', { userID: userProfile.userId, FriendID: friend_Id }).then((res) => {
				console.log(res)
				window.location.reload()
			})
		}
		if (action == 0) {
			axios.post('/friends_profiles/delete_friend', { userID: userProfile.userId, friend_id_to_delete: friend_Id }).then((res) => {
				console.log(res)
				window.location.reload()
			})
		}

	}

	return (
		<>

			<div id="profile_top" className="row" >
				<div className="col" >
					<img id="current_profile_img" alt="" />
					<input
						type="file"
						name="file"
						placeholder="Profile Image"
						id="img_upload_input"
						className="form-control form-group"
						hidden

					/>
					<div id="img_preview_div" className="preview-images"></div>
					<AddAPhotoIcon id="add_profile_img_icon" data-tip="add" onClick={OpenInput} />
					<button id="btn_update_img" onClick={UpdateProfileClicked}>Update Image</button>
				</div>

				<div className="col" >
					<div className="row" >
						<FaEdit className="edit_icon" data-tip="edit" onClick={OpenEditName} />
						<ReactTooltip />
						<label className="WhiteLabel" id="name_lable"> </label>
						<input id="edit_name" className="hideInput" ></input>
						<FaSave id="save_name_icon" className="edit_icon hideIcon" data-tip="save"
							onClick={SaveNewName} />
						<FaWindowClose id="close_name_icon" className="edit_icon hideIcon" data-tip="close"
							onClick={CloseNameEdit} />
					</div>
					<div className="row" >
						<FaEdit className="edit_icon" data-tip="edit" onClick={OpenEditEmail} />
						<label className="SmallLabel" id="email_lable" > </label>
						<input id="edit_email" className="hideInput"></input>
						<FaSave id="save_email_icon" className="edit_icon hideIcon" data-tip="save"
							onClick={SaveNewEmail} />
						<FaWindowClose id="close_email_icon" className="edit_icon hideIcon" data-tip="close"
							onClick={CloseEmailEdit} />
					</div>
					<div className="row" >
						<FaEdit className="edit_icon" data-tip="edit" onClick={OpenEditAge} />
						<label className="SmallLabel" id="birthdate_label"> </label>

						<input type="date" id="edit_age" className="hideInput"></input>
						<FaSave id="save_age_icon" className="edit_icon hideIcon" data-tip="save"
							onClick={SaveNewAge} />
						<FaWindowClose id="close_age_icon" className="edit_icon hideIcon" data-tip="close"
							onClick={CloseAgeEdit} />
					</div>
					<div className="row" >
						<label className="SmallLabel" id="age_lable"> </label>
					</div>
					<div className="row" >
						<FaEdit className="edit_icon" data-tip="edit" onClick={OpenEditCountry} />
						<label className="SmallLabel" id="Country_lable" >From:</label>
						<input id="edit_Country" className="hideInput"></input>
						<FaSave id="save_country_icon" className="edit_icon hideIcon" data-tip="save"
							onClick={SaveNewCountry} />
						<FaWindowClose id="close_country_icon" className="edit_icon hideIcon" data-tip="close"
							onClick={CloseCountryEdit} />

					</div>

				</div>

			</div>
			<div id="member_bot_part">
				<label className="WhiteLabel">Friends</label>
				<div>
					<FaUserFriends id="add_friend_icon"
						data-tip="add friend"
						onClick={() => SetisOpen(true)} />
					<AllUsersModal
						open={isOpen}
						friendTo={(friend_id, action) => ActionFriendClicked(friend_id, action)}
						Profiles={all_profiles_list} MyProfile={userProfile}
						onClose={() => SetisOpen(false)} />
				</div>


				<div id="FriendsComponent" className="row" >

					<Carousel infiniteLoop useKeyboardArrows autoPlay>
						{Carouselitems}
					</Carousel>
				</div>
			</div>
		</>
	)
}
