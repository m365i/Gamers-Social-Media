import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/authAPI'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, removeUser } from '../state/userSlice'
import './NavBarComponent.css'

import NotificationComponent from './NotificationComponent'

function NavBarComponent({ children }) {

	const history = useHistory()
	const { user, loading } = useSelector(selectUser)
	const dispatch = useDispatch()

	function onLogout() {
		logout()
			.then(() => {
				history.replace('/')
				dispatch(removeUser())
			})
			.catch(() => {
				history.replace('/')
			})
	}

	function checkLoggedIn() {

		if (user != null) {

			return ('/members')
		}
		else {
			return ('/login')
		}

	}

	/*
		function myFunction() {
			var x = document.getElementById('myTopnav')
			if (x.className === 'topnav') {
				x.className += ' responsive'
			} else {
				x.className = 'topnav'
			}
		}
		*/


	return (
		<div className="layout-container">

			<div className="layout-header mx-auto">

				<nav className="navbar mx-auto navbar-expand-lg navbar-dark">
					<Link className="navbar-brand" to="/">
						<img style={{ /*maxWidth: '90%'*/ }} id="main_logo" className="d-inline-block align-top" src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" />
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="/"> <i className="fas fa-home"></i> Home <span className="sr-only">(current)</span></Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/about_us" ><i className="fas fa-info-circle"></i> About Us</Link>
							</li>

							<li className="nav-item">
								<Link className="nav-link" to="/search"><i className="fas fa-search"></i> Search</Link>
							</li>

							<li className="nav-item">
								<Link className="nav-link" to="/contact"><i className="fas fa-paper-plane"></i> Contact</Link>
							</li>

							{user ?
								<>
									<li className="nav-item">
										<Link className="nav-link" to="/rooms"><i className="fas fa-comments"></i> Rooms</Link>
									</li>
								</>
								: undefined}


							<li className="nav-item">
								<Link className="nav-link" to={checkLoggedIn}><i className="fas fa-user"></i>
									{loading && '...'}
									{(!loading && user) ? ` ${user.name}` :
										' Log in'
									}
								</Link>
							</li>


							{user ?
								<>
									<li className="nav-item">
										<Link className="nav-link" to="#" onClick={onLogout}><i className="fas fa-sign-out-alt"></i> Logout</Link>
									</li>
								</>
								: undefined}

							<li className="nav-item">
								{user ? <NotificationComponent /> : null}
							</li>
						</ul>

					</div>
				</nav>

			</div>


			<div className="layout-content">
				{children}
			</div>

			<div className="layout-footer">
				<div className="container-fluid footer h-auto">
					<div className="container-md">
						<div className="row">
							<div className="mx-auto mb-4 my-4">
								<span style={{ 'color': '#ffa800', fontWeight: 'bold' }}>PlayTogether</span> is a free LFG app for finding
								gamer friends,<br />
								getting personal game recommendations,<br />
								and coordinating gameplay sessions with non-toxic people.
							</div>

							<div className="mx-auto my-0 h-auto">
								<br />© 2021 All rights reserved. <br />
								<span style={{ 'color': '#ffa800', fontWeight: 'bold' }}> Terms & Conditions | Privacy Policy</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}


export default NavBarComponent