
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import GameInfo from '../components/GameInfo'
import RoomChat from '../components/RoomChat'
import RoomMembers from '../components/RoomMembers'
import RoomAnnouncements from '../components/RoomAnnouncements'
import RoomSchedule from '../components/RoomSchedule'
import {useDispatch, useSelector} from 'react-redux'
import {selectUser} from '../state/userSlice'
import * as Mui from '@material-ui/core'
import * as MuiLab from '@material-ui/lab'
import Icon from '@material-ui/core/Icon'
import { DialogEditRoom } from '../components/DialogRoomBuilder'
import {makeStyles} from '@material-ui/core/styles'
import {actionDeleteRoom, actionJoinRoom, actionLeaveRoom, fetchRoom, selectRoom} from '../state/roomSlice'

const useStyles = makeStyles(() => ({
	container: {
		backgroundImage: `url(${process.env.PUBLIC_URL + '/images/photo-1556816214-6d16c62fbbf6.webp'})`,
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		padding: '30px 0px'
	},
	header: {
		padding: '10px 0px',
		color: 'white',
		'& img': {
			backgroundColor: 'red'
		}
	},
	controlls: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'end'
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

	const {id} = useParams()

	const {user} = useSelector(selectUser)
	const {name, game, creator_info, platform, description, isMember, isOwner, members, loading, error} = useSelector(selectRoom)
	const dispatch = useDispatch()

	const [openEditDialog, setOpenEditDialog] = useState(false)

	useEffect(() => {
		if(id) {
			dispatch(fetchRoom({roomId: id, userId: (user ? user.id : undefined)}))
		}
	}, [user, id])

	function editRoom() {
		setOpenEditDialog(true)
	}

	function deleteRoom() {
		if (confirm('Are you sure you want to delete this room?')) {
			dispatch(actionDeleteRoom())
		}
	}

	function leaveRoom() {
		if (confirm('Are you sure you want to leave this room?')) {
			dispatch(actionLeaveRoom())
		}
	}

	function joinRoom() {
		dispatch(actionJoinRoom())
	}

	if(loading) {
		return (
			<Mui.Box textAlign="center" m={3}>
				<Mui.CircularProgress />
			</Mui.Box>
		)
	}

	if(error) {
		return (
			<MuiLab.Alert severity="error">Error: fetching data for room &quot;{id}&quot; failed [reson: {error}]</MuiLab.Alert>
		)
	}
	
	return (
		<Mui.Box className={classes.container}>
			<Mui.Container maxWidth="md">

				<Mui.Box className={classes.header}>
					<Mui.Typography variant="h4"> 
						<Icon>games</Icon> 
						&nbsp;
						{name} 
						&nbsp;
						<Mui.Chip
							size="small"
							color="primary"
							avatar={<Mui.Avatar alt="user image" src={creator_info.image} />}
							label={'owner: ' + creator_info.name}
						/>
					</Mui.Typography>
					<Mui.Typography variant="caption"> #id: {id} </Mui.Typography>
				</Mui.Box>

				<Mui.Box className={classes.controlls}>
					{
						isOwner ?
							<>
								<Mui.Button variant="contained" onClick={editRoom}>
									<Icon>edit</Icon> &nbsp; Edit
								</Mui.Button>
								<DialogEditRoom 
									open={openEditDialog} 
									close={() => setOpenEditDialog(false)}
									roomId={id} />
								&nbsp;
								&nbsp;
								<Mui.Button variant="contained" color="secondary" onClick={deleteRoom}>
									<Icon>delete</Icon> &nbsp; Delete
								</Mui.Button>
							</>
							:
							isMember ?
								<Mui.Button variant="contained" color="secondary" onClick={leaveRoom}>
									<Icon>logout</Icon> &nbsp; Leave
								</Mui.Button>
								:
								user ?
									<Mui.Button variant="contained" color="primary" onClick={joinRoom}>
										<Icon>add</Icon> &nbsp; Join
									</Mui.Button>
									:
									undefined
					}
				</Mui.Box>

				{ (description && description.trim() !== '') ?
					<Mui.Box className={classes.desc}>
						<Mui.Typography variant="body1"> description: {description} </Mui.Typography>
					</Mui.Box>
					: undefined
				}

				<Mui.Box className={classes.stats}>
					<Mui.Grid container spacing={3}>
						<Mui.Grid item xs>
							<Mui.Paper>
								<Mui.Box className={classes.statItem}>
									<Mui.Typography variant="h6"> <Icon>sports_basketball</Icon> &nbsp; Game </Mui.Typography>
									<Mui.Typography variant="subtitle1"> {game} </Mui.Typography>
								</Mui.Box>
							</Mui.Paper>
						</Mui.Grid>
						<Mui.Grid item xs>
							<Mui.Paper>
								<Mui.Box className={classes.statItem}>
									<Mui.Typography variant="h6"> <Icon>sports_esports</Icon> &nbsp; Platform </Mui.Typography>
									<Mui.Typography variant="h5"> {platform} </Mui.Typography>
								</Mui.Box>
							</Mui.Paper>
						</Mui.Grid>
						<Mui.Grid item xs>
							<Mui.Paper>
								<Mui.Box className={classes.statItem}>
									<Mui.Typography variant="h6"> <Icon>groups</Icon> &nbsp; Friends </Mui.Typography>
									<Mui.Typography variant="h5"> {members.length} </Mui.Typography>
								</Mui.Box>
							</Mui.Paper>
						</Mui.Grid>
					</Mui.Grid>
				</Mui.Box>

				<Mui.Paper spacing={3} className={classes.body}>
					<Mui.Grid container spacing={3}>
						<Mui.Grid item xs>
							<RoomAnnouncements />
						</Mui.Grid>
						<Mui.Grid item xs>
							<RoomSchedule />
						</Mui.Grid>
					</Mui.Grid>
					<br />
					<Mui.Grid container spacing={3}>
						<Mui.Grid item xs>
							<RoomChat room={id} />
						</Mui.Grid>
						<Mui.Grid item xs>
							<RoomMembers />
						</Mui.Grid>
					</Mui.Grid>
				</Mui.Paper>

				<Mui.Box className={classes.footer}>
					<GameInfo name={game} />
				</Mui.Box>

			</Mui.Container>
		</Mui.Box>
	)
}

export default Room