import React from 'react'
import './home.css'
import RoomCard from '../components/RoomCard'
import { Link } from 'react-router-dom'

export default function Home() {

	return (
		<>
			{/* <!-- end header --> */}
			<div className="bar container-md h-auto">
				<div className="container">
					<div className="row">
						<div className=" py-5">
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
							<div className="row">
								<Link to="/login">
									<button type="button" id="yellow_btn" className="btn-lg btn-warning font-weight-bold px-5 mt-2 mx-2">
										Sign Up
									</button>
								</Link>
								<button type="button" id="white_btn" className="btn-lg btn-outline font-weight-bold  px-4 mt-2 mx-2">Learn More</button>
							</div>
						</div>
						
						<div className=" py-2">
							<img id="playSation_img" src="images/ps5.png" alt="Playstation 5 Controller" />
						
						</div>
					</div>
				</div>
			</div>


			{/* <!-- Rooms --> */}
			<div className="container-md my-2">
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

			<div className="container-md appBar mt-4 h-auto">
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


			<div className="social-bar container-md h-auto">
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

			{/* <!-- Optional JavaScript: jQuery first, then Popper.js, then Bootstrap JS --> */}
			
		</>
	)
}
