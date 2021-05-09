
import React from 'react'
import {
	Router,
	Switch,
	Route,
} from 'react-router-dom'
import {createBrowserHistory} from 'history'

import {useEffect} from 'react'

import {useSelector, useDispatch} from 'react-redux'

import {fetchUser, selectUser} from './state/userSlice'

import Home from './pages/home'
import Members from './pages/members'
import Login from './pages/login'
import Signup from './pages/signup'

import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './pages/forgot_password'
import ResetPassword from './pages/reset_password'
import Contact from './pages/contact'

const history = createBrowserHistory()

export default function App() {
	const {user, loading} = useSelector(selectUser)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchUser())
	}, [dispatch])

	if (loading) {
		return <> Loading... </>
	}

	return (
		<Router history={history}>
			<Switch>
				<Route path="/signup" component={Signup} />
				<Route path="/login" component={Login} />
				<Route path="/reset-password/:code" component={ResetPassword} />
				<Route path="/forgot-password" component={ForgotPassword} />
				<Route path="/contact" component={Contact} />
				<PrivateRoute authed={user !== undefined} path='/members' component={Members} />
				<Route path="/" component={Home} />
			</Switch>
		</Router>
	)
}
