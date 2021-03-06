import React from 'react'
import './home.css'
import RoomCard from '../components/RoomCard'
import { Link } from 'react-router-dom'

export default function Home() {

	return (
		<>
			{/* <!-- end header --> */}
			<div className="bar container-fluid h-auto">
				<div className="container-md">
					<div className="row">
						<div className="col-md-6 py-5">
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
							</div>
						</div>
						
						<div className="col-md-6 py-2 text-right">
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
						<RoomCard game="DOTA 2" img="https://i.pinimg.com/736x/d1/59/e9/d159e9ca272b73f56ef2b770a7c0b17b.jpg" />
						<RoomCard game="PUBG" img="https://m.media-amazon.com/images/M/MV5BMTRkMjg2NDEtYzIxYi00MzZlLTllNmQtOTE4YWMzNjIwZDNkXkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_FMjpg_UY480_.jpg" />
						<RoomCard game="GTA V" img="https://www.rockstargames.com/V/img/global/order/GTAV-PC.jpg" />
						<RoomCard game="LEFT FOR DEAD 2" img="https://m.media-amazon.com/images/I/91cFzvxFGyS._SY445_.jpg" />
						<RoomCard game="DOTA 1" img="images/dota2_room.png" />
					</ul>
					<div className="col d-flex align-items-center">
						<a href="#">
							<img src="images/arrow_left.png" />
						</a>
					</div>
				</div>
			</div>

			<div className="container-fluid appBar mt-4 h-auto">
				<div className="container-md">
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


			<div className="social-bar container-fluid h-auto">
				<div className="container-md">
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
