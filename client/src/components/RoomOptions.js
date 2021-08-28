import React from 'react'
import $ from 'jquery'
import ReactDom from 'react-dom'
import './RoomOptions.css'
/* import axios from '../services/axios.config'
import { IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io' */
export default function RoomOptions({ open, onClose, Room }) {
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


    $('#btn_modal_up').removeAttr('disabled')
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div className="container-md align-content-center " style={MODAL_STYLES}>
                <label id="openlabel_">Would you Like to Open this Room?</label>
                <button id="btn_modal_ye" className="btn-outline-success" onClick={() => { window.open(`/room/${Room._id}`); onClose() }}>Yes</button>
                <button id="btn_modal_no" className="btn-outline-danger" onClick={() => { onClose() }}>No</button>
            </div>

        </>,
        document.getElementById('portal')
    )
}


