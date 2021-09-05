import { React, useState, useEffect } from 'react'

import NotifyMe from 'react-notification-timeline'
import './NotificationComponent.css'
import axios from '../services/axios.config'
import { selectUser } from '../state/userSlice'
import { useSelector } from 'react-redux'
export default function NotificationComponent() {
    /* 
        const [showCount, setShowCount] = useState(false)
        const [messageCount, setMessageCount] = useState(0)
        const [show, setShow] = useState(false)
        const [target, setTarget] = useState(null)
        const [raedIndex, setReadIndex] = useState(0)
    
     */
    const [notifications, Setnotifications] = useState([])
    const [FullData, SetFullData] = useState([])
    const { user } = useSelector(selectUser)
    const fetchData = async () => {
        //console.log(user.id)
        await axios.get('notifications/all_notes/').then((res) => {
            //  console.log(res.data)
            SetFullData(res.data)
            for (let i = 0; i < res.data.length; i++) {
                const note = res.data[i]

                if (note.to_id == user.id) {
                    Setnotifications(notifications => [...notifications, { update: note.update, timestamp: (typeof note.timestamp === 'string') ? parseInt(note.timestamp) : note.timestamp }])
                }

            }

        })
        // console.log(notifications)



    }



    useEffect(() => {
        fetchData()


        // eslint-disable-next-line 
    }, [])

    /* [
    {
        'update': '<a href="http://localhost:3000/room/611e13859766a528fce2149d" ></a>',
        'timestamp': new Date().now,

    },
    {
        'update': 'Time to take a Break, TADA!!!',
        'timestamp': new Date().now
    }
] */
    /*     const handleClick = (event) => {
            setShow(!show)
            setTarget(event.target)
        } */
    function MarkReadNote() {
        for (let i = 0; i < FullData.length; i++) {
            axios.delete(`/notifications/delete_note/${FullData[i]._id}`)

        }
        window.location.reload()
    }

    return (
        <>
            <NotifyMe
                data={notifications}
                storageKey='notific_key'
                notific_key='timestamp'
                notific_value='update'
                heading='Notification Alerts'
                sortedByKey={false}
                showDate={true}
                size={18}
                color="orange"
                markAsReadFn={() => MarkReadNote()}
            />
        </>
    )
}
