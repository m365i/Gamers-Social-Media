
import axios from './axios.config'
//import sha256 from 'crypto-js/sha256'


export function update_profile_data(user_id,profile_data) {
	return axios.put(`/profiles/profile/${user_id}`,profile_data)
}


export function get_profile_data(user_id) {
	return axios.get(`/profiles/profile/${user_id}`)
}

export function delete_profile(user_id) {
	return axios.delete(`/profiles/profile/${user_id}`)
}

export function get_all_profiles() {
	return axios.get('/profiles/all_profiles')
}
