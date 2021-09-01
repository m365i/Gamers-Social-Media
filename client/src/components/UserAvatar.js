
import {Avatar} from '@material-ui/core'
import React from 'react'

function UserAvatar({userId, size, circle}) {
	return (
		<Avatar sizes={size} style={{width: size, height: size}} alt="user image" variant={circle ? 'circle' : 'square'}  src={process.env.REACT_APP_SERVER_URL + '/api/profiles/img/get_img/' + userId}>
			<img height={size} width={size} src={'https://avatars.dicebear.com/api/bottts/' + userId + '.svg'} alt="user image" />
		</Avatar>
	)
/*
	const [image, setImage] = useState(undefined)
	const [error, setError] = useState(false)

	useEffect(() => {
		setError(false)
		setImage(undefined)
		setImage(process.env.REACT_APP_SERVER_URL + '/api/profiles/img/get_img/' + userId)
	}, [userId])

	return (
		<div style={{
			backgroundColor: '#5BADDF', 
			borderRadius: (circle ? size + 'px' : undefined), 
			overflow: 'hidden', 
			width: size + 'px', 
			height: size + 'px'
			}}>
			<img style={{display: 'block'}} height={size} width={size} onError={() => setError(true)} src={error ? 'https://avatars.dicebear.com/api/bottts/' + userId + '.svg' : image} alt="user image" />
		</div>
	) */
}

export default UserAvatar