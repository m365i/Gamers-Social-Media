import React from 'react'
export default function RoomCard(props) {
	return (
		<li>
			<div className="room" style={{ backgroundImage: 'url(' + props.img + ')' + (props.fallbackImg ? ', url(' + props.fallbackImg + ')' : ''), backgroundRepeat: 'no-repeat', backgroundColor: 'white' }}>
				<div className="room_info">
					<p><strong>{props.game}</strong><br /></p>
				</div>
			</div>
		</li>
	)
}