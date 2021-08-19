
import axios from 'axios'

const instance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL + '/api/',
	withCredentials: true,
})

export default instance
