import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/authAPI'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, removeUser } from '../state/userSlice'
import './MemberNavBar.css'

function MemberNavBar() {
	const history = useHistory()
	const { user } = useSelector(selectUser)
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



	return (
		<>

			<nav className="navbar">
				<div className="navbar-container-md inline-flex ">
					<Link to="/">
						<img src="images/logo.png" alt="logo" />
					</Link>

					<ul className='nav-menu'>
						<li>
							<Link to='/' className='nav-links ' >
                                Home
							</Link>
						</li>
						<li>
							<Link to='/' className='nav-links' >
                                Profile
							</Link>
						</li>
						<li>
							<Link to='/' className='nav-links' >
                                Rooms
							</Link>
						</li>
						<li>
							<Link to='/' className='nav-links' >
                                Logout
							</Link>
						</li>
						<li>
							<div id='user_name'> 
                                Hello {user.name}
								<br />
								<button onClick={onLogout}>logout</button>
							</div>
						</li>
					</ul>

				</div>
			
			</nav>
		</>
	)
}


export default MemberNavBar