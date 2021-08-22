
import { React } from 'react'
import './RoomsSearchPage.css'
import SearchRoomForm from '../components/SearchRoomForm'

import ReactTooltip from 'react-tooltip'
export default function RoomsSearchPage() {





    /* Pc|Xbox|Playstation|Android|Apple|Psp */

    return (
		<div style={{height: '100vh'}}>
			<div className="container-md">
				<ReactTooltip />
				<SearchRoomForm />
			</div>
		</div>
    )
}
