
import React from 'react'
import {Link} from 'react-router-dom'

export default function Home() {
	return (
		<>
			<p> Welcome home!</p>
			<br />
			<Link to="/members">Members Only</Link>
			<br />
			<Link to="/contact">Contact</Link>
		</>
	)
}
