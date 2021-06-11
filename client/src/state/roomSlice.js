
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {
	info as gameInfo, 
	members as gameMembers, 
	announcements as gameAnnouncements, 
	schedules as gameSchedules,
	deleteRoom as gameDeleteRoom,
	leave as gameLeaveRoom,
	join as gameJoinRoom,
	schedule as gameMakeSchedule,
	deleteSchedule as gameDeleteSchedule,
	announce as gameMakeAnnouncement, 
	deleteAnnouncement as gameDeleteAnnouncement,
	edit as gameEditRoom
} from '../services/roomAPI'

export const fetchRoom = createAsyncThunk('room/fetchRoom', async ({roomId, userId}, thunkApi) => {
	try {
		const info = (await gameInfo(roomId)).data
		const members = (await gameMembers(roomId)).data
		let isOwner = false, isMember = false
		if(userId) {
			if(userId === info.creator) {
				isOwner = true
			}
			members.forEach(m => {
				if(userId === m.userId) {
					isMember = true
				}
			})
		}
		const creator_info = members.filter(m => m.userId === info.creator)[0]
		const announcements = (await gameAnnouncements(roomId)).data
		const schedules = (await gameSchedules(roomId)).data
		return {roomId, userId, info, members, creator_info, isOwner, isMember, announcements, schedules}
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

export const updateSchedule = createAsyncThunk('room/updateSchedule', async (fromDate, thunkApi) => {
	try {
		const roomId = thunkApi.getState().room.roomId
		const schedules = (await gameSchedules(roomId)).data
		return schedules
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

export const makeSchedule = createAsyncThunk('room/makeSchedule', async (fromDate, thunkApi) => {
	try {
		const roomId = thunkApi.getState().room.roomId
		await gameMakeSchedule(roomId, fromDate)
		const schedules = (await gameSchedules(roomId)).data
		return schedules
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

export const deleteSchedule = createAsyncThunk('room/deleteSchedule', async (scheduleId, thunkApi) => {
	try {
		const roomId = thunkApi.getState().room.roomId
		await gameDeleteSchedule(roomId, scheduleId)
		const schedules = (await gameSchedules(roomId)).data
		return schedules
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

export const updateAnnouncement = createAsyncThunk('room/updateAnnouncement', async (message, thunkApi) => {
	try {
		const roomId = thunkApi.getState().room.roomId
		const announcements = (await gameAnnouncements(roomId)).data
		return announcements
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

export const makeAnnouncement = createAsyncThunk('room/makeAnnouncement', async (message, thunkApi) => {
	try {
		const roomId = thunkApi.getState().room.roomId
		await gameMakeAnnouncement(roomId, message)
		const announcements = (await gameAnnouncements(roomId)).data
		return announcements
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

export const deleteAnnouncement = createAsyncThunk('room/deleteAnnouncement', async (announcementId, thunkApi) => {
	try {
		const roomId = thunkApi.getState().room.roomId
		await gameDeleteAnnouncement(roomId, announcementId)
		const announcements = (await gameAnnouncements(roomId)).data
		return announcements
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

export const actionChangeRoomMembership = createAsyncThunk('room/actionChangeRoomMembership', async (_, thunkApi) => {
	try {
		const roomId = thunkApi.getState().room.roomId
		const members = (await gameMembers(roomId)).data
		return members
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

export const actionJoinRoom = createAsyncThunk('room/actionJoinRoom', async (_, thunkApi) => {
	try {
		const roomId = thunkApi.getState().room.roomId
		await gameJoinRoom(roomId)
		const members = (await gameMembers(roomId)).data
		return members
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

export const actionLeaveRoom = createAsyncThunk('room/actionLeaveRoom', async (_, thunkApi) => {
	try {
		const roomId = thunkApi.getState().room.roomId
		await gameLeaveRoom(roomId)
		const members = (await gameMembers(roomId)).data
		return members
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

export const actionDeleteRoom = createAsyncThunk('room/actionDeleteRoom', async (_, thunkApi) => {
	try {
		const roomId = thunkApi.getState().room.roomId
		await gameDeleteRoom(roomId)
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

export const actionEditRoom = createAsyncThunk('room/actionEditRoom', async ({name, game, platform, description}, thunkApi) => {
	try {
		const roomId = thunkApi.getState().room.roomId
		await gameEditRoom(roomId, name, game, platform, description)
		return {name, game, platform, description}
	} catch (err) {
		thunkApi.rejectWithValue(err.response.data)
	}
})

const initialState = {
	roomId: undefined,
	userId: undefined,
	name: undefined,
	game: undefined,
	creator: undefined,
	creator_info: undefined,
	platform: undefined,
	description: undefined,
	isOwner: undefined,
	isMember: undefined,
	members: undefined,
	announcements: undefined,
	schedules: undefined,
	loading: true,
	error: undefined
}

const roomSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		afterEditRoom: (state, action) => {
			const {name, game, platform, description} = action.payload
			state.name = name
			state.game = game
			state.platform = platform
			state.description = description
			state.loading = false
		}
	},
	extraReducers: {
		[fetchRoom.pending]: (state) => {
			state.loading = true
		},
		[fetchRoom.fulfilled]: (state, action) => {
			const {roomId, userId, info, members, creator_info, isOwner, isMember, announcements, schedules} = action.payload
			state.roomId = roomId
			state.userId = userId
			state.name = info.name
			state.game = info.game
			state.creator = info.creator
			state.creator_info = creator_info
			state.platform = info.platform
			state.description = info.description
			state.isOwner = isOwner
			state.isMember = isMember
			state.members = members
			state.announcements = announcements
			state.schedules = schedules
			state.loading = false
		},
		[fetchRoom.rejected]: (state, action) => {
			state.error = action.payload
			state.loading = false
		},

		[updateSchedule.fulfilled]: (state, action) => {
			const schedules = action.payload
			state.schedules = schedules
		},
		[updateSchedule.rejected]: (state, action) => {
			state.error = action.payload
		},

		[makeSchedule.fulfilled]: (state, action) => {
			const schedules = action.payload
			state.schedules = schedules
		},
		[makeSchedule.rejected]: (state, action) => {
			state.error = action.payload
		},

		[deleteSchedule.fulfilled]: (state, action) => {
			const schedules = action.payload
			state.schedules = schedules
		},
		[deleteSchedule.rejected]: (state, action) => {
			state.error = action.payload
		},

		[updateAnnouncement.fulfilled]: (state, action) => {
			const announcements = action.payload
			state.announcements = announcements
		},
		[updateAnnouncement.rejected]: (state, action) => {
			state.error = action.payload
		},

		[makeAnnouncement.fulfilled]: (state, action) => {
			const announcements = action.payload
			state.announcements = announcements
		},
		[makeAnnouncement.rejected]: (state, action) => {
			state.error = action.payload
		},

		[deleteAnnouncement.fulfilled]: (state, action) => {
			const announcements = action.payload
			state.announcements = announcements
		},
		[deleteAnnouncement.rejected]: (state, action) => {
			state.error = action.payload
		},

		[actionChangeRoomMembership.fulfilled]: (state, action) => {
			const members = action.payload
			if(state.userId) {
				state.isMember = false
				members.forEach(m => {
					if(state.userId === m.userId) {
						state.isMember = true
					}
				})
			}
			state.members = members
		},
		[actionChangeRoomMembership.rejected]: (state, action) => {
			state.error = action.payload
		},

		[actionJoinRoom.fulfilled]: (state, action) => {
			const members = action.payload
			state.isMember = true
			state.members = members
		},
		[actionJoinRoom.rejected]: (state, action) => {
			state.error = action.payload
		},

		[actionLeaveRoom.fulfilled]: (state, action) => {
			const members = action.payload
			state.isMember = false
			state.members = members
		},
		[actionLeaveRoom.rejected]: (state, action) => {
			state.error = action.payload
		},

		[actionDeleteRoom.fulfilled]: () => {
			window.location = '/'
		},
		[actionDeleteRoom.rejected]: (state, action) => {
			state.error = action.payload
		},

		[actionEditRoom.pending]: (state) => {
			state.loading = true
		},
		[actionEditRoom.fulfilled]: (state, action) => {
			const {name, game, platform, description} = action.payload
			state.name = name
			state.game = game
			state.platform = platform
			state.description = description
			state.loading = false
		},
		[actionEditRoom.rejected]: (state, action) => {
			state.error = action.payload
			state.loading = false
		},
	},
})

export const selectRoom = (state) => state.room

export const actionAfterEditRoom = roomSlice.actions.afterEditRoom

export default roomSlice.reducer
