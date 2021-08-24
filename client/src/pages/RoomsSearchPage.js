
import { React, useEffect, useState } from 'react'
import axios from '../services/axios.config'
import './RoomsSearchPage.css'
import SearchRoomForm from '../components/SearchRoomForm'

import ReactTooltip from 'react-tooltip'
export default function RoomsSearchPage() {

	const [AllProfilesList, SetAllProfilesList] = useState([])

	const [dataFetched, SetdataFetch] = useState(false)

	const fetchData = async () => {
		await axios.get('/profiles/all_profiles').then((all_profiles) => {
			SetAllProfilesList(all_profiles.data)
			//console.log(all_profiles_list)
		})

		SetdataFetch(true)

	}
	function showStuff() {
		if (dataFetched)
			return (<SearchRoomForm Profiles={AllProfilesList} />)
	}
	useEffect(() => {
		fetchData()

	}, [])
	/* Pc|Xbox|Playstation|Android|Apple|Psp */

	return (
		<div style={{ height: '100vh' }}>
			<div className="container-md">
				<ReactTooltip />
				{showStuff()}
			</div>
		</div>
	)
}
