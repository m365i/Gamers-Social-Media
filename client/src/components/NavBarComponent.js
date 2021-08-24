import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/authAPI'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, removeUser } from '../state/userSlice'
import $ from 'jquery'
import './NavBarComponent.css'
import { FaBars } from 'react-icons/fa'
import NotificationComponent from './NotificationComponent'


function NavBarComponent({ children }) {
	const [isLogged, setLogged] = useState(false)

	const history = useHistory()
	const { user, loading } = useSelector(selectUser)
	const dispatch = useDispatch()

	function onLogout() {
		logout()
			.then(() => {
				dispatch(removeUser())
				history.replace('/login')
			})
			.catch(() => {
				history.replace('/login')
			})
	}

	React.useEffect(() => {
		if (user != null) {
			$('#login_link').css('display', 'none')
			setLogged(true)

		}
		else {
			$('#logout_link').css('display', 'none')
			setLogged(false)
			//console.log('sssss')
		}
		return () => {

		}
	}, [isLogged])

	function checkLoggedIn() {

		if (user != null) {

			return ('/members')
		}
		else {
			return ('/login')
		}

	}


	function myFunction() {
		var x = document.getElementById('myTopnav')
		if (x.className === 'topnav') {
			x.className += ' responsive'
		} else {
			x.className = 'topnav'
		}
	}


	return (
		<>
			<div className="container-md">
				<div className="container-md  header h-auto w-auto">
					<div>
						<div className="container-md mt-4">
							<img style={{ maxWidth: '90%' }} id="main_logo" src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" />

							<div className="topnav" id="myTopnav">

								<li className="my_nav_item"  >
									<Link className="navbar-brand nav-item" to="/" style={{ textDecoration: 'none' }}>
										<img src={process.env.PUBLIC_URL + '/images/home_icon.png'} alt="Home" />
										Home
									</Link>
								</li>



								<li className="my_nav_item" >
									<Link className="navbar-brand nav-item" to="/about_us" style={{ textDecoration: 'none' }}>
										<img src={process.env.PUBLIC_URL + '/images/about_icon.png'} alt="About us" />
										About us
									</Link>


								</li>
								{user ?
									<>
										<li className="my_nav_item" >
											<Link className="navbar-brand nav-item" to="/search" style={{ textDecoration: 'none' }}>
												<img src={process.env.PUBLIC_URL + '/images/search_icon.png'} alt="Search" />
												Search
											</Link>
										</li>

										<li className="my_nav_item" >
											<Link className="navbar-brand nav-item" to="/rooms" style={{ textDecoration: 'none' }}>
												Rooms
											</Link>
										</li>
									</>
									: null}

								<li className="my_nav_item" >
									<Link className="navbar-brand nav-item" to={checkLoggedIn} style={{ textDecoration: 'none' }}>
										<img src={process.env.PUBLIC_URL + '/images/login_icon.png'} alt="Login" />
										{loading && '...'}
										{(!loading && user) ? `${user.name}` :
											'Click Here To Log in'
										}
									</Link>

								</li>

								<li>
									<Link id="logout_link" to='#' style={{ textDecoration: 'none' }} className="navbar-brand nav-item" onClick={onLogout}>logout</Link>
								</li>
								<li className="my_nav_item" id="nav_bar_icon" onClick={myFunction}>
									<FaBars />
								</li>
								<li>
									{user ? <NotificationComponent /> : null}
								</li>
							</div>


						</div>
						{/* <!-- end container header --> */}
					</div>

				</div>
			</div>

			{children}

			<div className="container-md footer h-auto">
				<div className="container">
					<div className="row">
						<div className="mx-auto mb-4 mr-4">
							<span style={{ 'color': '#ffa800', fontWeight: 'bold' }}>PlayTogether</span> is a free LFG app for finding
							gamer friends,<br />
							getting personal game recommendations,<br />
							and coordinating gameplay sessions with non-toxic people.
						</div>

						<div className="mx-auto my-auto h-auto">
							<br />© 2021 All rights reserved. <br />
							<span style={{ 'color': '#ffa800', fontWeight: 'bold' }}> Terms & Conditions | Privacy Policy</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}


export default NavBarComponent