

//import React, { useState, useEffect } from 'react'
import React, { useEffect } from 'react'
import { selectUser } from '../state/userSlice'
import { useSelector } from 'react-redux'
import axios from '../services/axios.config'
import $ from 'jquery'
import './members.css'
import NavBarComponent from '../components/NavBarComponent'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'

//import { get_all_profiles } from '../services/ProfileAPI'
export default function Members() {


	const { user } = useSelector(selectUser)




	useEffect(() => {
		//fetchData()
		SetImage_PreView()
		console.log(user)
	}, [])

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
					<AddAPhotoIcon id="add_profile_img_icon" onClick={OpenInput} />
					<button onClick={UpdateProfileClicked}>Update Image</button>
				</div>

				<div className="col" >
					<label id="WhiteLabel">{user.name}</label>
					<div className="row" >
						<label id="WhiteLabel">{user.email}</label>
					</div>
					<div className="row" >
						<label id="WhiteLabel">{user.country}</label>
					</div>

				</div>

			</div>

			<div id="RoomsComponent" className="row" >
				<label id="WhiteLabel">Rooms Component Here</label>

			</div>

			<div id="FriendsComponent" className="row" >
				<label id="WhiteLabel">Friends Component Here</label>

			</div>


		</>
	)
}
