import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/authAPI'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, removeUser } from '../state/userSlice'
import $ from 'jquery'
import './NavBarComponent.css'

function NavBarComponent() {
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
			console.log('sssss')
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



	return (
		<>
			<div className="container-md">
				<div className="container-md  header h-auto w-auto">
					<div>
						<div className="container-md ">
							<Link to='/'>
								<img id="main_logo" src="images/logo.png" alt="logo" />
							</Link>

							{/* <!-- Just an image --> */}
							<ul className="navbar m-0" style={{ listStyleType: 'none', marginTop: '-15px' }}>
								<li>
									<Link className="navbar-brand nav-item" to="/">
										<img src="images/home_icon.png" alt="Home" />
									</Link>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link className="navbar-brand nav-item" to="/about_us">
										<img src="images/about_icon.png" alt="About us" />
										About us
									</Link>
								</li>
								<li>
									<Link className="navbar-brand nav-item" to="/search">
										<img src="images/search_icon.png" alt="Search" />
										Search
									</Link>
								</li>
								<li>
									<Link className="navbar-brand nav-item" to={checkLoggedIn}>
										<img src="images/login_icon.png" alt="Login" />
										{loading && '...'}
										{(!loading && user) ? `${user.name}` :
											'not logged in'
										}
									</Link>

									<Link id="login_link" to="/login" > Login </Link>
								</li>

								<li>
									<Link id="logout_link" to='#' className="navbar-brand nav-item" onClick={onLogout}>logout</Link>
								</li>
							</ul>

						</div>
						{/* <!-- end container header --> */}
					</div>

				</div>
			</div>







		</>
	)
}


export default NavBarComponent