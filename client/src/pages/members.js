
import { logout } from '../services/authAPI'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, removeUser } from '../state/userSlice'

export default function Members() {

    const history = useHistory()
    const { user } = useSelector(selectUser)
    const dispatch = useDispatch()

    function onLogout(event) {
        logout()
            .then(res => {
                dispatch(removeUser())
                history.replace('/login')
            })
            .catch(err => undefined)
    }

    return (
        <>
            <p> Hello { user.name }</p>
            <br />
            <button onClick={onLogout}>logout</button>
        </>
    )
}