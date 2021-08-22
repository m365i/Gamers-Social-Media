
import { React, useState } from 'react'
import './RoomsPage.css'
import NewRoomForm from '../components/NewRoomForm'
import { RiChatNewLine } from 'react-icons/ri'
import ReactTooltip from 'react-tooltip'
import MyRoomsComponent from '../components/MyRoomsComponent'
export default function RoomsPage() {


    const [shownewRoomFormResults, setShownewRoomForm] = useState(false)




    /* Pc|Xbox|Playstation|Android|Apple|Psp */

    return (
        <div style={{height: '100vh'}}>
            <div className="container-md">
                <RiChatNewLine id="newRoomForm_btn" data-tip="Create New Room" onClick={() => setShownewRoomForm(!shownewRoomFormResults)}>Create New Room</RiChatNewLine>
                <ReactTooltip />
                {shownewRoomFormResults ? <NewRoomForm /> : null}


            </div>

            <div className="container-md col-9">
         
                <MyRoomsComponent />


            </div>

        </div >
    )
}
