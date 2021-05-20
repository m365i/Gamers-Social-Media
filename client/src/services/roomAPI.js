
import axios from './axios.config'

export function deleteRoom(roomId) {
	return axios.delete('/room/', {params: {roomId}})
}

export function leave(roomId) {
	return axios.delete('/room/members', {params: {roomId}})
}

export function join(roomId) {
	return axios.post('/room/members', {}, {params: {roomId}})
}

export function edit(roomId, name, game, platform, description) {
	return axios.put('/room', {name, game, platform, description}, {params: {roomId}})
}

export function create(name, game, platform, description) {
	return axios.post('/room', {name, game, platform, description})
}

export function info(roomId) {
	return axios.get('/room', {params: {roomId}})
}

export function members(roomId) {
	return axios.get('/room/members', {params: {roomId}})
}

export function announcements(roomId) {
	return axios.get('/room/announcements', {params: {roomId}})
}

export function announce(roomId, message) {
	return axios.post('/room/announcements', {message}, {params: {roomId}})
}

export function deleteAnnouncement(roomId, announcementId) {
	return axios.delete('/room/announcements', {params: {roomId}, data: {announcementId}})
}

export function schedules(roomId) {
	return axios.get('/room/schedule', {params: {roomId}})
}

export function schedule(roomId, fromDate, toDate) {
	return axios.post('/room/schedule', {fromDate, toDate}, {params: {roomId}})
}

export function deleteSchedule(roomId, scheduleId) {
	return axios.delete('/room/schedule', {params: {roomId}, data: {scheduleId}})
}

export function autoCompleteGame(name) {
	return axios.get('/games/autoComplete', {params: {name}})
}