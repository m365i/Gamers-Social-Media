import axios from '../services/axios.config'
import { React, useEffect, useState } from 'react'
import './MyRoomsComponent.css'
import { Carousel } from 'react-responsive-carousel'
import RoomOptions from '../components/RoomOptions'
export default function MyRoomsComponent() {


    const [MyRooms, SetMyRoomsList] = useState([])
    const [OpenRoomOptions, SetOpenRoomOptions] = useState(false)
    const [FocusedRoom, SetFocusedRoom] = useState(null)
    /*     function CreateRoomclicked() {
            const new_room = {
                name: $('#room_name').val(),
                game: $('select[name=gameSelector] option').filter(':selected').val(),
                platform: $('select[name=PlatformSelector] option').filter(':selected').val(),
                description: $('#game_desc_ta').val()
            }
            // console.log(new_room)
    
            axios.post('/room/', new_room).then((res) => {
                // return ReactDOM.createPortal(`/room/${res.data}`, this.containerEl)
                window.open(`/room/${res.data}`, '_blank')
            })
    
    
        } */

    function GetAllGamesOption() {

        axios.get('/room/list').then((res) => {
            //console.log(res.data)
            for (let i = 0; i < res.data.length; i++) {
                const room = res.data[i]
                axios.get(`/games/info?name=${room.game}`).then((info) => {
                    //console.log(info.data.image)


                    SetMyRoomsList(MyRooms =>
                        [...MyRooms, <div key={i} onClick={() => { SetFocusedRoom(room); SetOpenRoomOptions(true) }}>
                            <label key={i} >{room.name}</label>
                            <img src={info.data.image} />
                        </div>])
                })


            }

        })

    }



    useEffect(() => {

        GetAllGamesOption()

    }, [])

    /* Pc|Xbox|Playstation|Android|Apple|Psp */
    return (
        <div>
            <div className="container-md" id="my_rooms_comp">
                <label id="rooms_lable">My ROOMS</label>
                <Carousel infiniteLoop useKeyboardArrows >
                    {MyRooms}
                </Carousel>
            </div>
            <RoomOptions open={OpenRoomOptions}
                Room={FocusedRoom}
                onClose={() => SetOpenRoomOptions(false)} />

        </div>
    )
}
