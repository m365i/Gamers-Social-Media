
import React from 'react'
import {
	Router,
	Switch,
	Route,
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { fetchUser, selectUser } from './state/userSlice'

import PrivateRoute from './components/PrivateRoute'

import Home from './pages/home'
import Members from './pages/members'
import Login from './pages/login'
import Signup from './pages/signup'
import ForgotPassword from './pages/forgot_password'
import ResetPassword from './pages/reset_password'
import Contact from './pages/contact'
import Room from './pages/room'
import friendProfilePage from './pages/friendProfilePage'
import RoomsPage from './pages/RoomsPage'
import RoomsSearchPage from './pages/RoomsSearchPage'
import NavBarComponent from './components/NavBarComponent'
import Invite from './pages/invite'

const history = createBrowserHistory()

export default function App() {
	const { user, loading } = useSelector(selectUser)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchUser())
	}, [dispatch])

	const isLoggedIn = (user !== undefined)

	if (loading) {
		return <> Loading... </>
	}

	return (
		<Router history={history}>
			<NavBarComponent>
				<Switch>
					<PrivateRoute access={!isLoggedIn} redirect="/" path="/signup" component={Signup} />
					<PrivateRoute access={!isLoggedIn} redirect="/" path="/login" component={Login} />
					<PrivateRoute access={!isLoggedIn} redirect="/" path="/reset-password/:code" component={ResetPassword} />
					<PrivateRoute access={!isLoggedIn} redirect="/" path="/forgot-password" component={ForgotPassword} />
					<Route path="/contact" component={Contact} />
					<Route path="/room/:id" component={Room} />
					<Route path="/friend_profile/:id" component={friendProfilePage} />
					<Route path="/rooms" component={RoomsPage} />
					<Route path="/search" component={RoomsSearchPage} />
					<PrivateRoute access={isLoggedIn} redirect="/login" path="/members" component={Members} />
					<Route path="/invite/:roomId/:code" component={Invite} />
					<Route exact path="/" component={Home} />
					<Route component={() => (window.location = '/404.html')} />
				</Switch>
			</NavBarComponent>
		</Router>
	)
}
