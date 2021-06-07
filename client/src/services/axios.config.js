
import axios from 'axios'

const instance = axios.create({
	baseURL: (process.env.REACT_APP_DEV_SERVER_URL || '') + '/api/',
	timeout: 5000,
	withCredentials: true,
})

export default instance
