
import { React, useState, useEffect } from 'react'
import './RoomsPage.css'
import NewRoomForm from '../components/NewRoomForm'
import { RiChatNewLine } from 'react-icons/ri'
import axios from '../services/axios.config'
import ReactTooltip from 'react-tooltip'
import MyRoomsComponent from '../components/MyRoomsComponent'
import { useSelector } from 'react-redux'
import { selectUser } from '../state/userSlice'
export default function RoomsPage() {


    const [shownewRoomFormResults, setShownewRoomForm] = useState(false)
    const [all_profiles_list, set_profiles_list] = useState([])
    const { user } = useSelector(selectUser)
    const [userProfile, SetuserProfile] = useState(null)
    //const [FriendFocused, SetFriendFocused] = useState(null)
    const [dataFetched, SetdataFetch] = useState(false)



    const fetchData = async () => {
        await axios.get(`profiles/profile/${user.id}`).then((res) => {
            //console.log(res.data[0])
            SetuserProfile(res.data[0])

        })

        await axios.get('/profiles/all_profiles').then((all_profiles) => {
            set_profiles_list(all_profiles.data)
            //console.log(all_profiles_list)
        })

        SetdataFetch(true)

    }



    useEffect(() => {
        fetchData()
        // eslint-disable-next-line 
    }, [dataFetched])



    /* Pc|Xbox|Playstation|Android|Apple|Psp */

    return (
        <div style={{ height: '100vh' }}>
            <div className="container-md">
                <RiChatNewLine id="newRoomForm_btn" data-tip="Create New Room" onClick={() => setShownewRoomForm(!shownewRoomFormResults)}>Create New Room</RiChatNewLine>
                <ReactTooltip />
                {shownewRoomFormResults ? <NewRoomForm /> : null}

            </div>

            <div className="container-md ">

                <MyRoomsComponent Profiles_RC={all_profiles_list} MyProfile_RC={userProfile} />


            </div>

        </div >
    )
}
