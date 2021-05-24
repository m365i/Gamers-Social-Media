import React from 'react'
export default function RoomCard(props) {
	return (
		<li>
			<div className="room" style={{ backgroundImage: 'url(' + props.img +')'}}>
				<div className="room_info">
					<p><strong>{props.game}</strong><br />something.</p>
				</div>
			</div>``
		</li>
	)
}