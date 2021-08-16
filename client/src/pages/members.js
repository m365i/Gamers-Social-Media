

//import React, { useState, useEffect } from 'react'
import React, { useEffect, useState } from 'react'
import { selectUser } from '../state/userSlice'
import { useSelector } from 'react-redux'
import axios from '../services/axios.config'
import $ from 'jquery'
import './members.css'
import NavBarComponent from '../components/NavBarComponent'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { FaEdit, FaSave, FaWindowClose } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
//import { get_all_profiles } from '../services/ProfileAPI'
export default function Members() {


	const { user } = useSelector(selectUser)
	const [userProfile, SetuserProfile] = useState(user)
	const [dataFetched, SetdataFetch] = useState(false)
	const fetchData = async () => {
		await axios.get(`profiles/profile/${user.id}`).then((res) => {
			console.log(res.data[0])
			SetuserProfile(res.data[0])
			SetdataFetch(true)
		})


	}



	useEffect(() => {
		fetchData()
		SetImage_PreView()


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
		$('#edit_age').css('display', 'block')
		$('#edit_age').val(userProfile.birth)
		$('#save_age_icon').css('display', 'block')
		$('#close_age_icon').css('display', 'block')
	}

	function SaveNewAge() {
		$('#age_lable').show()
		$('#edit_age').hide()
		$('#save_age_icon').hide()
		$('#close_age_icon').hide()
		let curr_year = new Date().getFullYear()
		let chosen = parseInt($('#edit_age').val().slice(0, 4))
		console.log(curr_year - chosen)
	}

	function CloseAgeEdit() {
		$('#age_lable').show()
		$('#edit_age').hide()
		$('#save_age_icon').hide()
		$('#close_age_icon').hide()
	}

	function OpenEditCountry() {
		$('#Country_lable').hide()
		$('#edit_Country').css('display', 'block')
		$('#save_country_icon').css('display', 'block')
		$('#close_country_icon').css('display', 'block')

	}

	function SaveNewCountry() {
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

	return (

		<>
			<NavBarComponent />

			<div id="profile_top" className="row" >
				<div id="profile_top" className="col" >
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
						<label className="WhiteLabel" id="name_lable"> {user.name}</label>
						<input id="edit_name" className="hideInput" ></input>
						<FaSave id="save_name_icon" className="edit_icon hideIcon" data-tip="save"
							onClick={SaveNewName} />
						<FaWindowClose id="close_name_icon" className="edit_icon hideIcon" data-tip="close"
							onClick={CloseNameEdit} />
					</div>
					<div className="row" >
						<FaEdit className="edit_icon" data-tip="edit" onClick={OpenEditEmail} />
						<label className="SmallLabel" id="email_lable" >Email: {user.email}</label>
						<input id="edit_email" className="hideInput"></input>
						<FaSave id="save_email_icon" className="edit_icon hideIcon" data-tip="save"
							onClick={SaveNewEmail} />
						<FaWindowClose id="close_email_icon" className="edit_icon hideIcon" data-tip="close"
							onClick={CloseEmailEdit} />
					</div>
					<div className="row" >
						<FaEdit className="edit_icon" data-tip="edit" onClick={OpenEditAge} />
						<label className="SmallLabel" id="age_lable">BirthDate: </label>
						<input type="date" id="edit_age" className="hideInput"></input>
						<FaSave id="save_age_icon" className="edit_icon hideIcon" data-tip="save"
							onClick={SaveNewAge} />
						<FaWindowClose id="close_age_icon" className="edit_icon hideIcon" data-tip="close"
							onClick={CloseAgeEdit} />
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

			<div id="RoomsComponent" className="row" >
				<label className="WhiteLabel">Rooms Component Here</label>

			</div>

			<div id="FriendsComponent" className="row" >
				<label className="WhiteLabel">Friends Component Here</label>

			</div>


		</>
	)
}
