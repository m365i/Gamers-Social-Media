import axios from '../services/axios.config'
import { React, useState, useEffect } from 'react'
import './SearchRoomForm.css'
import $ from 'jquery'
import RoomOptions from '../components/RoomOptions'
import { Carousel } from 'react-responsive-carousel'
export default function SearchRoomForm() {


    const [AllGamesList, SetAllGamesList] = useState([])
    const [ResultList, SetResultList] = useState([])
    const [FocusedRoom, SetFocusedRoom] = useState(null)
    const [OpenRoomOptions, SetOpenRoomOptions] = useState(false)
    const [MyRooms, SetMyRoomsList] = useState([])
    async function SearchRoomclicked() {

        /*      const room_to_search = {
                 name: $('#room_name').val(),
                 game: $('select[name=gameSelector] option').filter(':selected').val(),
                 platform: $('select[name=PlatformSelector] option').filter(':selected').val(),
                 description: $('#game_desc_ta').val()
             } */
        // console.log(new_room)

        const filtered_list = ResultList.filter(obj =>
            obj.game == $('select[name=gameSelector] option').filter(':selected').val() &&
            obj.platform == $('select[name=PlatformSelector] option').filter(':selected').val()
        )


        for (let i = 0; i < filtered_list.length; i++) {
            const room = filtered_list[i]
            axios.get(`/games/info?name=${room.game}`).then((info) => {
                //console.log(info.data.image)

                SetMyRoomsList(MyRooms =>
                    [...MyRooms, <div key={i} onClick={() => { SetFocusedRoom(room); SetOpenRoomOptions(true) }}>
                        <label key={i} >{room.name}</label>
                        <img src={info.data.image} />
                    </div>])
            })


        }



    }

    function GetAllSearchOption() {


        axios.get('room/list-all?offset=0&length=100').then((res) => {
            // return ReactDOM.createPortal(`/room/${res.data}`, this.containerEl)
            SetResultList(res.data)

        })

        axios.get('/games/list?offset=0&length=100').then((res) => {
            //console.log(res.data)
            for (let i = 0; i < res.data.length; i++) {
                const game = res.data[i]

                SetAllGamesList(AllGamesList =>
                    [...AllGamesList, <option key={i} className="form-control" value={game.name} >{game.name}</option>])

            }

        })

    }


    function ClearSearchClicked() {

        window.location.reload()
    }



    useEffect(() => {

        GetAllSearchOption()

    }, [])

    /* Pc|Xbox|Playstation|Android|Apple|Psp */

    return (
        <div className="container-md" id="new_room_form">
            <div className="col form-group" id="newRoomFormdiv">
                <div>
                    <select name="gameSelector" className="form-control">
                        {AllGamesList}
                    </select>
                </div>
                <div>
                    <select name="PlatformSelector" className="form-control">
                        <option className="form-control" value={'Pc'} >Pc</option>
                        <option className="form-control" value={'Xbox'} >Xbox</option>
                        <option className="form-control" value={'Playstation'} >Playstation</option>
                        <option className="form-control" value={'Android'} >Android</option>
                        <option className="form-control" value={'Apple'} >Apple</option>
                        <option className="form-control" value={'linux'} >linux</option>
                        <option className="form-control" value={'Psp'} >Psp</option>
                    </select>

                    <button className="btn-outline-success form-control" onClick={SearchRoomclicked}>Search Rooms</button>
                    <div id="new_room_form_error"></div>
                    <br />
                    <button className="btn-outline-success form-control" onClick={ClearSearchClicked}>Clear Search</button>
                </div>
            </div>

            <Carousel infiniteLoop useKeyboardArrows >
                {MyRooms}
            </Carousel>

            <RoomOptions open={OpenRoomOptions}
                Room={FocusedRoom}
                onClose={() => SetOpenRoomOptions(false)} />

        </div>
    )
}
