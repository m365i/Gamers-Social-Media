
import React from 'react'
import './home.css'
import RoomCard from '../components/RoomCard'

import { Link } from 'react-router-dom'
import { selectUser } from '../state/userSlice'
import { useSelector } from 'react-redux'
export default function Home() {
	const { user, loading } = useSelector(selectUser)
	return (
		<>
			<div className="container-fluid header">
				<div>
					<div className="container pt-4">
						<a href="http://localhost:3000">
							<img src="images/logo.png" alt="logo" />
						</a>

						{/* <!-- Just an image --> */}
						<ul className="navbar float-right" style={{ listStyleType: 'none', marginTop: '-15px' }}>
							<li>
								<a className="navbar-brand" href="#">
									<img src="images/home_icon.png" alt="Home" />
								</a>
								<a href="http://localhost:3000">Home</a>
							</li>
							<li>
								<a className="navbar-brand" href="#">
									<img src="images/about_icon.png" alt="About us" />
									About us
								</a>
							</li>
							<li>
								<a className="navbar-brand" href="#">
									<img src="images/search_icon.png" alt="Search" />
									Search
								</a>
							</li>
							<li>
								<a className="navbar-brand" href="#">
									<img src="images/login_icon.png" alt="Login" />
									{loading && '...'}
									{(!loading && user) ? `${user.name}` :
										'not logged in'
									}
								</a>
								<a href="http://localhost:3000/login"> Login </a>
							</li>
						</ul>

					</div>
					{/* <!-- end container header --> */}
				</div>

			</div>

			{/* <!-- end header --> */}

			<div className="bar container-fluid">
				<div className="container">
					<div className="row">
						<div className="col-11 py-5">
							<h1>
								<span style={{ 'color': '#ffa800', fontWeight: 'bold' }}>Gaming tourment</span> on one place.
							</h1>
							<h2>
								Ready to join?
							</h2>
							<h3>
								it’s free.
							</h3>
							<h4>
								Play and organize competitions in all games.
							</h4>
							<button type="button" className="btn-lg btn-warning font-weight-bold px-5 mt-2 mx-2">

								<Link to="/signup"> Sign Up</Link> </button>
							<button type="button" className="btn-lg btn-outline-light font-weight-bold px-4 mt-2 mx-2"
								style={{ 'background': 'transparent!important' }}>Learn More</button>
						</div>
						<div className="col-1 py-2">
							<img src="images/ps5.png" alt="Playstation 5 Controller" />
						</div>
					</div>
				</div>
			</div>


			{/* <!-- Rooms --> */}
			<div className="container my-2">
				<h3>Rooms</h3>
				<hr />
				<div className="row">
					<div className="col d-flex align-items-center">
						<a href="#">
							<img src="images/arrow_right.png" />
						</a>
					</div>

					<ul className="list-group list-group-horizontal-md room-list" style={{ listStyleType: 'none' }}>
						<RoomCard game="DOTA 2" img="images/dota2_room.png" />
						<RoomCard game="DOTA 1" img="images/dota2_room.png" />
						<RoomCard game="PUBG" img="images/dota2_room.png" />
						<RoomCard game="GTA V" img="images/dota2_room.png" />
						<RoomCard game="DOTA 2" img="images/dota2_room.png" />
					</ul>
					<div className="col d-flex align-items-center">
						<a href="#">
							<img src="images/arrow_left.png" />
						</a>
					</div>
				</div>
			</div>

			<div className="container-fluid appBar mt-4">
				<div className="container">
					<div className="row mx-auto py-5">
						<div className="col-12 text-center">
							<h1>
								NEVER <span style={{ 'color': '#ffa800' }}>PLAY</span> ALONE.
							</h1>
							<div className="row text-center mx-auto my-5">
								<ul className="list-group list-group-horizontal-md mx-auto" style={{ listStyleType: 'none' }}>
									<li><a href="#" target="_blank"><img src="images/google_play_icon.png" /></a></li>
									<li><a href="#" target="_blank"><img src="images/app_store_icon.png" /></a></li>
									<li><a href="#" target="_blank"><img src="images/webapp_ico.png" /></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>


			<div className="social-bar container-fluid">
				<div className="container">
					<div className="row mx-auto py-5">
						<div className="col-12 text-center">
							<strong>We <span style={{ 'color': 'red' }}>♥</span> new friends!</strong>
							<div className="row text-center px-5 my-3">
								<ul className="list-group list-group-horizontal-md mx-auto" style={{ listStyleType: 'none' }}>
									<li><a href="#" target="_blank"><img src="images/facebook_icon.png" /></a></li>
									<li><a href="#" target="_blank"><img src="images/instagram_icon.png" /></a></li>
									<li><a href="#" target="_blank"><img src="images/twitter icon.png" /></a></li>
									<li><a href="#" target="_blank"><img src="images/discord_icon.png" /></a></li>
									<li><a href="#" target="_blank"><img src="images/youtube_icon.png" /></a></li>
								</ul>
							</div>
							<img src="images/GETAMEMBER.png" />
						</div>
					</div>
				</div>
			</div>

			<div className="container-fluid footer">
				<div className="container">
					<div className="row">
						<div className="col-8 my-4">
							<span style={{ 'color': '#ffa800', fontWeight: 'bold' }}>PlayTogether</span> is a free LFG app for finding
					gamer friends,<br />
					getting personal game recommendations,<br />
					and coordinating gameplay sessions with non-toxic people.
						</div>

						<div className="col-4 my-4">
							<img src="images/logo.png" height="20px" />
							<br />© 2021 All rights reserved. <br />
							<span style={{ 'color': '#ffa800', fontWeight: 'bold' }}> Terms & Conditions | Privacy Policy</span>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- Optional JavaScript: jQuery first, then Popper.js, then Bootstrap JS --> */}

		</>
	)
}
