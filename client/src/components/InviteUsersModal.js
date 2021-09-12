import { React, useState } from 'react'
import $ from 'jquery'
import ReactDom from 'react-dom'
import './AllUsersModal.css'
import { IoIosAddCircle } from 'react-icons/io'
import { CgMoreO } from 'react-icons/cg'
import ReactTooltip from 'react-tooltip'
import ShowProfileComponent from './ShowProfileComponent'
export default function InviteUsersModal({ open, onClose, Profiles, MyProfile, friendTo }) {

    const [SelectedProfile, SetSeletedProfile] = useState()

    const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#19273a',
        padding: '50px',
        zIndex: 1000,
        borderRadius: '5rem',
        width: '400px'
    }

    const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
    }

    /*     function textChanged() {
          
            console.log($("[name='input_message']").val());
        } */
    if (!open) { return null }

    function IsMyfriend(friend) {

        for (const fr of MyProfile.friends) {

            if (friend.userId == fr) {

                return true
            }
        }
        return false

    }



    function GetAllUserProfiles() {
        let items = []

        for (let i = 0; i < Profiles.length; i++) {
            if (MyProfile.name == Profiles[i].name) {
                continue
            }

            let s = 'friend_img_' + String(i)

            if (IsMyfriend(Profiles[i])) {

                items.push(<div key={i}>
                    <img className="friend_img" id={s} src={process.env.REACT_APP_SERVER_URL + '/api/profile/img/get_img/' + Profiles[i].userId} alt="" />
                    <label className="friend_img_label">{Profiles[i].name}</label>
                    <IoIosAddCircle className="Circle_icon" data-tip="invite friend to room"
                        onClick={() => { friendTo(Profiles[i].userId); onClose() }} />
                    <CgMoreO className="Circle_icon" data-tip="more info" onClick={() => SetSeletedProfile(Profiles[i])} />
                </div>)
            }
        }
        //console.log(items)
        return (
            <div>
                {items}
            </div>
        )

    }



    $('#btn_modal_up').removeAttr('disabled')
    //console.log(Room)
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div className="container-md align-content-center " style={MODAL_STYLES}>
                {SelectedProfile ? <ShowProfileComponent ShowProfile={SelectedProfile} /> : null}
                <ReactTooltip />
                {GetAllUserProfiles()}


                <button id="btn_modal_up" className="btn-outline-danger" onClick={() => { onClose() }}>close</button>
            </div>

        </>,
        document.getElementById('portal')
    )
}


