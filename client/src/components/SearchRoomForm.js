import axios from '../services/axios.config'
import { React, useState, useEffect } from 'react'
import './SearchRoomForm.css'
import $ from 'jquery'
import RoomOptions from '../components/RoomOptions'
import { Carousel } from 'react-responsive-carousel'
export default function SearchRoomForm({ Profiles }) {


    const [AllGamesList, SetAllGamesList] = useState([])
    const [AllOwnersList, SetAllOwnersList] = useState([])

    const [ResultList, SetResultList] = useState([])
    const [FocusedRoom, SetFocusedRoom] = useState(null)
    const [OpenRoomOptions, SetOpenRoomOptions] = useState(false)
    const [MyRooms, SetMyRoomsList] = useState([])


    const [ShowSearchByGame, SetShowSearchByGame] = useState(false)
    const [ShowSearchByPlatform, SetShowSearchByPlatform] = useState(false)
    const [ShowSearchRoomName, SetShowSearchByRooName] = useState(false)
    const [ShowSearchRoomOwner, SetShowSearchRoomOwner] = useState(false)

    async function SearchRoomclicked() {
        let filtered_list = ResultList
        // console.log(filtered_list)
        if (ShowSearchByGame) {
            filtered_list = filtered_list.filter(obj =>
                obj.game == $('select[name=gameSelector] option').filter(':selected').val()
            )

        }

        if (ShowSearchByPlatform) {
            filtered_list = filtered_list.filter(obj =>
                obj.platform == $('select[name=PlatformSelector] option').filter(':selected').val()
            )

        }

        if (ShowSearchRoomName) {
            filtered_list = filtered_list.filter(obj =>
                obj.name == $('#room_name_input').val() ||
                obj.name.startsWith($('#room_name_input').val())
            )

        }

        if (ShowSearchRoomOwner) {
            filtered_list = filtered_list.filter(obj =>
                obj.creator == $('select[name=CreatorSelector] option').filter(':selected').val()
            )

        }

        SetMyRoomsList([])

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
        //console.log(Profiles)
        for (let i = 0; i < Profiles.length; i++) {
            const profile = Profiles[i]
            let s = 'dd' + String(i)

            SetAllOwnersList(AllOwnersList =>
                [...AllOwnersList, <option key={s} className="form-control" value={profile.userId} >{profile.name}</option>])

        }


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

                <div className="form-check">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customSearchByGamelID" onClick={() => SetShowSearchByGame(!ShowSearchByGame)} />
                        <label className="custom-control-label" htmlFor="customSearchByGamelID">Search By Game</label>
                    </div>
                </div>

                <div className="form-check">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customSearchByPlatformlID" onClick={() => SetShowSearchByPlatform(!ShowSearchByPlatform)} />
                        <label className="custom-control-label" htmlFor="customSearchByPlatformlID">Search By Platform</label>
                    </div>
                </div>

                <div className="form-check">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customSearchByRoomNamelID" onClick={() => SetShowSearchByRooName(!ShowSearchRoomName)} />
                        <label className="custom-control-label" htmlFor="customSearchByRoomNamelID">Search By Room Name</label>
                    </div>
                </div>


                <div className="form-check">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customSearchByRoomOwnerlID" onClick={() => SetShowSearchRoomOwner(!ShowSearchRoomOwner)} />
                        <label className="custom-control-label" htmlFor="customSearchByRoomOwnerlID">Search By Room Owner</label>
                    </div>
                </div>

                {ShowSearchByGame ? <div>
                    <select name="gameSelector" className="form-control">
                        {AllGamesList}
                    </select>
                </div> : null}

                {ShowSearchRoomOwner ? <div>
                    <select name="CreatorSelector" className="form-control">
                        {AllOwnersList}
                    </select>
                </div> : null}


                {ShowSearchByPlatform ? <div>
                    <select name="PlatformSelector" className="form-control">
                        <option className="form-control" value={'Pc'} >Pc</option>
                        <option className="form-control" value={'Xbox'} >Xbox</option>
                        <option className="form-control" value={'Playstation'} >Playstation</option>
                        <option className="form-control" value={'Android'} >Android</option>
                        <option className="form-control" value={'Apple'} >Apple</option>
                        <option className="form-control" value={'linux'} >linux</option>
                        <option className="form-control" value={'Psp'} >Psp</option>
                    </select>
                </div> : null}


                {ShowSearchRoomName ? <input type="text" id="room_name_input" className="form-control" placeholder="Room Name" /> : null}




                <button className="btn-outline-success form-control" onClick={SearchRoomclicked}>Search Rooms</button>
                <div id="new_room_form_error"></div>
                <br />
                <button className="btn-outline-success form-control" onClick={ClearSearchClicked}>Clear Search</button>

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
