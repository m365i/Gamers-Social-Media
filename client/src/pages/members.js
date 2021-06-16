

import React, { useState,useEffect } from 'react'

import NavBarComponent from '../components/NavBarComponent'
import { get_all_profiles } from '../services/ProfileAPI'
export default function Members() {
	const [data, setData] =useState(null)

	const fetchData =  () => {
		get_all_profiles().then((res)=>{

			//console.log(JSON.stringify(res.data))
			setData(JSON.stringify(res.data))
		}
		)
	
		
	}


	useEffect(() => {
		fetchData()
	}, [])


	return (

		<>
			<NavBarComponent />
			<div >
				{data}
			</div>

		</>
	)
}
