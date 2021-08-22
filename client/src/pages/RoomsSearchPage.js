
import { React } from 'react'
import NavBarComponent from '../components/NavBarComponent'
import './RoomsSearchPage.css'
import SearchRoomForm from '../components/SearchRoomForm'

import ReactTooltip from 'react-tooltip'
export default function RoomsSearchPage() {





    /* Pc|Xbox|Playstation|Android|Apple|Psp */

    return (
        <div>
            <NavBarComponent />
            <div className="container-md">
                <ReactTooltip />
                <SearchRoomForm />


            </div>

            <div className="container-md col-9">



            </div>

        </div >
    )
}
