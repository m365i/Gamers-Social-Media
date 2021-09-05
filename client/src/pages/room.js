
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GameInfo from '../components/GameInfo'
import RoomChat from '../components/RoomChat'
import RoomMembers from '../components/RoomMembers'
import RoomAnnouncements from '../components/RoomAnnouncements'
import RoomSchedule from '../components/RoomSchedule'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../state/userSlice'
import { Box, Button, Chip, CircularProgress, Container, Grid, Paper, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Icon from '@material-ui/core/Icon'
import { DialogEditRoom } from '../components/DialogRoomBuilder'
import { makeStyles } from '@material-ui/core/styles'
import { actionChangeRoomMembership, fetchRoom, selectRoom } from '../state/roomSlice'
import UserAvatar from '../components/UserAvatar'
import InviteUsersModal from '../components/InviteUsersModal'
import axios from '../services/axios.config'
import {
	deleteRoom as gameDeleteRoom,
	leave as gameLeaveRoom,
	join as gameJoinRoom
} from '../services/roomAPI'

const useStyles = makeStyles(() => ({
	container: {
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		padding: '30px 0px'
	},
	header: {
		padding: '10px 0px',
		color: 'white'
	},
	controls: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	desc: {
		padding: '10px 0px',
		color: 'white'
	},
	stats: {
		padding: '10px 0px',
	},
	statItem: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		'& h6': {
			display: 'flex',
			alignItems: 'center'
		}
	},
	body: {
		padding: '10px',
		margin: '10px'
	},
	footer: {
		padding: '10px 0px'
	},
	'@global': {
		body: {
			margin: '0',
			padding: '0'
		}
	}
}))

function Room() {
	const classes = useStyles()

	const { id } = useParams()

	const { user } = useSelector(selectUser)
	const { name, game, creator_info, platform, description, isMember, isOwner, isPrivate, members, loading, error } = useSelector(selectRoom)
	const dispatch = useDispatch()

	const [deleteRoomLoading, setDeleteRoomLoading] = useState(false)
	const [changeRoomMembershipLoading, setChangeRoomMembershipLoading] = useState(false)

	const [openEditDialog, setOpenEditDialog] = useState(false)
	const [isOpen, SetisOpen] = useState(false)

	const [userProfile, SetuserProfile] = useState(null)
	const [all_profiles_list, set_profiles_list] = useState([])



	const fetchData = async () => {
		await axios.get(`profiles/profile/${user.id}`).then((res) => {
			//console.log(res.data[0])
			SetuserProfile(res.data[0])

		})

		await axios.get('/profiles/all_profiles').then((all_profiles) => {
			set_profiles_list(all_profiles.data)
			//console.log(all_profiles_list)
		})


	}






	useEffect(() => {
		if (id) {
			dispatch(fetchRoom({ roomId: id, userId: (user ? user.id : undefined) }))
		}
		fetchData()
	}, [user, id])

	function editRoom() {
		setOpenEditDialog(true)
	}
	function deleteRoom() {
		if (window.confirm('Are you sure you want to delete this room?')) {
			setDeleteRoomLoading(true)
			gameDeleteRoom(id)
				.then(() => {
					window.location = '/'
				})
				.catch(err => {
					window.alert('Error: ' + err.message)
					console.error(err)
				})
				.finally(() => {
					setDeleteRoomLoading(false)
				})
		}
	}

	function leaveRoom() {
		if (window.confirm('Are you sure you want to leave this room?')) {
			setChangeRoomMembershipLoading(true)
			gameLeaveRoom(id)
				.then(() => {
					dispatch(actionChangeRoomMembership())
				})
				.catch(err => {
					window.alert('Error: ' + err.message)
					console.error(err)
				})
				.finally(() => {
					setChangeRoomMembershipLoading(false)
				})
		}
	}

	function joinRoom() {
		setChangeRoomMembershipLoading(true)
		gameJoinRoom(id)
			.then(() => {
				dispatch(actionChangeRoomMembership())
			})
			.catch(err => {
				window.alert('Error: ' + err.message)
			})
			.finally(() => {
				setChangeRoomMembershipLoading(false)
			})
	}

	function ActionFriendInviteClicked(friend_id) {


		axios.post('/notifications/new_note',
			{
				from_id: userProfile.userId,
				to_id: friend_id,
				update: `You Have Received new invitation From ${userProfile.name} <br>
								<a href=${'/room/' + id} >Link To Join The Room</a> `,
				timestamp: new Date().now
			}).then(() => {

				console.log('invitetion Sent')
			})

	}


	if (loading) {
		return (
			<>
				<Box textAlign="center" m={3}>
					<CircularProgress />
				</Box>
			</>
		)
	}

	if (error) {
		return (
			<>
				<Alert severity="error">Error: fetching data for room &quot;{id}&quot; failed [reson: {error}]</Alert>
			</>
		)
	}

	return (
		<>


			<Box className={classes.container}>
				<Container maxWidth="md">
					<Box className={classes.header}>
						<Typography variant="h4">
							<Icon>games</Icon>
							&nbsp;
							{name}
							&nbsp;
							<Chip
								size="small"
								color="primary"
								avatar={<UserAvatar userId={creator_info.userId} circle size="25px" />}
								label={'owner: ' + creator_info.name}
							/>
							{
								isPrivate ?
									<>
										&nbsp;
										<Chip
											size="small"
											color="secondary"
											label={'private'}
										/>
									</>
									: undefined
							}
						</Typography>
						<Typography variant="caption"> #id: {id} </Typography>
					</Box>

					<Box className={classes.controls} color="white">
						{
							isOwner ?
								<>
									<Button variant="text" onClick={() => SetisOpen(true)}
										color="inherit" data-tip="Invite Friend To Room">
										<i className="fas fa-user-plus"></i>
										&nbsp;Add
									</Button>

									<InviteUsersModal open={isOpen}
										friendTo={(friend_id) => ActionFriendInviteClicked(friend_id)}
										Profiles={all_profiles_list} MyProfile={userProfile}
										onClose={() => SetisOpen(false)} />


									<Button
										variant="text"
										color="inherit"
										onClick={editRoom}>
										<Icon>edit</Icon> &nbsp; Edit
									</Button>
									<DialogEditRoom
										open={openEditDialog}
										close={() => setOpenEditDialog(false)}
										roomId={id} />
									&nbsp;
									&nbsp;
									<Button
										disabled={deleteRoomLoading}
										variant="text"
										color="secondary"
										onClick={deleteRoom}>
										{
											deleteRoomLoading ?
												<>
													<CircularProgress size={15} color="inherit" />
													&nbsp;
													&nbsp;
												</>
												: undefined
										}
										<Icon>delete</Icon> &nbsp; Delete
									</Button>
								</>
								:
								isMember ?
									<Button
										disabled={changeRoomMembershipLoading}
										variant="text"
										color="inherit"
										onClick={leaveRoom}>
										{
											changeRoomMembershipLoading ?
												<>
													<CircularProgress size={15} color="inherit" />
													&nbsp;
													&nbsp;
												</>
												: undefined
										}
										<Icon>logout</Icon> &nbsp; Leave
									</Button>
									:
									user ?
										<Button
											disabled={changeRoomMembershipLoading}
											variant="text"
											color="inherit"
											onClick={joinRoom}>
											{
												changeRoomMembershipLoading ?
													<>
														<CircularProgress size={15} color="inherit" />
														&nbsp;
														&nbsp;
													</>
													: undefined
											}
											<Icon>add</Icon> &nbsp; Join
										</Button>
										:
										undefined
						}
					</Box>

					{(description && description.trim() !== '') ?
						<Box className={classes.desc}>
							<Typography variant="body1"> description: {description} </Typography>
						</Box>
						: undefined
					}

					<Box className={classes.stats}>
						<Grid container spacing={3}>
							<Grid item xs>
								<Paper>
									<Box className={classes.statItem}>
										<Typography variant="h6"> <Icon>sports_basketball</Icon> &nbsp; Game </Typography>
										<Typography variant="subtitle1"> {game} </Typography>
									</Box>
								</Paper>
							</Grid>
							<Grid item xs>
								<Paper>
									<Box className={classes.statItem}>
										<Typography variant="h6"> <Icon>sports_esports</Icon> &nbsp; Platform </Typography>
										<Typography variant="h5"> {platform} </Typography>
									</Box>
								</Paper>
							</Grid>
							<Grid item xs>
								<Paper>
									<Box className={classes.statItem}>
										<Typography variant="h6"> <Icon>groups</Icon> &nbsp; Friends </Typography>
										<Typography variant="h5"> {members.length} </Typography>
									</Box>
								</Paper>
							</Grid>
						</Grid>
					</Box>

					<Paper spacing={3} className={classes.body}>
						<Grid container spacing={3}>
							<Grid item xs>
								<RoomAnnouncements />
							</Grid>
							<Grid item xs>
								<RoomSchedule />
							</Grid>
						</Grid>
						<br />
						<Grid container spacing={3}>
							<Grid item xs>
								<RoomChat roomId={id} />
							</Grid>
							<Grid item xs>
								<RoomMembers />
							</Grid>
						</Grid>
					</Paper>

					<Box className={classes.footer}>
						<GameInfo name={game} />
					</Box>

				</Container>
			</Box>
		</>
	)
}

export default Room