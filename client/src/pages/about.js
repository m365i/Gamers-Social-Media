import React from 'react'

function About() {
	return (
		<iframe style={{border: 'none', width: '100%'}} src={process.env.PUBLIC_URL + '/pages/about.html'} title="about page"> </iframe>
	)
}

export default About