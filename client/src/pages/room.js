
import React from 'react'
import {useParams} from 'react-router-dom'
import GameInfo from '../components/GameInfo'
import Chat from '../components/Chat'

function Room() {

	const { id } = useParams()
	
	return (
		<>
			<p> Game Id: {id} </p>
			<br/>
			<Chat room="609d2ad13306c864f9e11050" />
			<br />
			<GameInfo name="The Bridge" />
		</>
	)
}

export default Room