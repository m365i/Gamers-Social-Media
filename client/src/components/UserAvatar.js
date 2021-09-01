
import Robohash from 'react-robohash'
import React, {useEffect, useState} from 'react'

function UserAvatar({userId, size, dummy}) {

	const [image, setImage] = useState({url:null})
	const [error, setError] = useState(false)

	//console.log(userId)

	useEffect(() => {
		setError(false)
		setImage(undefined)
		setImage({url:process.env.REACT_APP_SERVER_URL + '/api/profile/img/get_img/' + userId + '?'+ new Date().getTime()})
	}, [userId,dummy])

	let img = undefined
	if(error) {
		img = <Robohash name={userId} size={size + 'x' + size} alt="user image"/>
	} else {
		img = <img style={{display: 'block'}} height={size} width={size} onError={() => setError(true)} src={image.url} alt="user image" />
	}

	return (
		<div style={{
			backgroundColor: '#5BADDF', 
			//borderRadius: (circle ? size + 'px' : undefined), 
			overflow: 'hidden', 
			borderRadius: '200px',
			border: '3px solid white',
			width: size + 'px', 
			height: size + 'px'
			}}>
			{img}
		</div>
	) 
}

export default UserAvatar