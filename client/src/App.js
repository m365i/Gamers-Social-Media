
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
			<Switch>
				<PrivateRoute access={!isLoggedIn} redirect="/" path="/signup" component={Signup} />
				<PrivateRoute access={!isLoggedIn} redirect="/" path="/login" component={Login} />
				<PrivateRoute access={!isLoggedIn} redirect="/" path="/reset-password/:code" component={ResetPassword} />
				<PrivateRoute access={!isLoggedIn} redirect="/" path="/forgot-password" component={ForgotPassword} />
				<Route path="/contact" component={Contact} />
				<Route path="/room/:id" component={Room} />
				<PrivateRoute access={isLoggedIn} redirect="/login" path="/members" component={Members} />
				<Route path="/" component={Home} />
			</Switch>
		</Router>
	)
}
