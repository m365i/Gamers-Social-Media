
import axios from './axios.config'

export function getImageUrl(name) {
	return axios.defaults.baseURL + 'games/cover/' + name
}