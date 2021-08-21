import React from 'react'

import './ShowProfileComponent.css'

export default function ShowProfileComponent({ ShowProfile }) {


    return (
        <>
            <div id="profile_data">

                <label><b>Name:</b>&nbsp;&nbsp;{ShowProfile.name}</label>
                <br />

                <label><b>email:</b>&nbsp;&nbsp;{ShowProfile.email}</label>
                <br />
                <label><b>birth date:</b>&nbsp;&nbsp;{new Date(ShowProfile.birth).toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem' }).replace(/\D/g, '/')}</label>
                <br />
                <label><b>country:</b>&nbsp;&nbsp;{ShowProfile.country}</label>


            </div>

        </>
    )
}
