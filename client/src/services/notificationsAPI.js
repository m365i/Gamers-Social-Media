
import axios from './axios.config'

export function notify(from, to, message) {
	return axios.post('/notifications/new_note', {from_id: from, to_id: to, update: message, timestamp: Date.now()})
}
