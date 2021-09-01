
import {Avatar} from '@material-ui/core'
import React from 'react'

function UserAvatar({userId, size, circle}) {
	console.log(userId, size)
	return (
		<Avatar sizes={size} style={{width: size, height: size}} alt="user image" variant={circle ? 'circle' : 'square'}  src={process.env.REACT_APP_SERVER_URL + '/api/profile/img/get_img/' + userId}>
			<img height={size} width={size} src={'https://avatars.dicebear.com/api/bottts/' + userId + '.svg'} alt="user image" />
		</Avatar>
	)
}

export default UserAvatar