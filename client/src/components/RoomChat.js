
import React, {useRef,useEffect, useState} from 'react'
import { Box, Dialog, Divider, FilledInput, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import Icon from '@material-ui/core/Icon'
import {makeStyles} from '@material-ui/core/styles'
import Picker from 'emoji-picker-react'
import moment from 'moment'
import grey from '@material-ui/core/colors/grey'
import {ChatSocket} from '../services/chatSocket'
import {useSelector} from 'react-redux'
import {selectRoom} from '../state/roomSlice'
import UserAvatar from './UserAvatar'

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '500px',
		minWidth: '400px'
	},
	error: {
		height: '100%',
		border: '1px solid lightgrey',
		display: 'flex',
		flexDirection: 'column-reverse'
	},
	list: {
		height: '100%',
		border: '1px solid lightgrey',
		overflowY: 'scroll',
		display: 'flex',
		flexDirection: 'column-reverse'
	},
	loading: {
		justifyContent: 'center',
		padding: '20px',
		backgroundColor: grey[200],
		color: grey[700]
	},
	emoji: {
		position: 'fixed'
	},
	messageText: {
		color: 'black'
	},
	messageInfo: {
		display: 'flex',
		justifyContent: 'space-between',
		color: grey[700],
		fontSize: '0.875rem'
	}
}))

function RoomChat({room}) {
	const classes = useStyles({})

	const {isMember} = useSelector(selectRoom)

	const [list, setList] = useState([])
	const [message, setMessage] = useState('')
	const [allowedToChat, setAllowedToChat] = useState(undefined)
	const [error, setError] = useState(undefined)

	const messagesListRef = useRef(undefined)
	const [canLoadMore, setCanLoadMore] = useState(true)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [updateScroll, setUpdateScroll] = useState(0)
	
	useEffect(() => {
		if(messagesListRef.current) {
			const scrollTop = messagesListRef.current.scrollTop
			const top = messagesListRef.current.scrollHeight - messagesListRef.current.clientHeight
			if(canLoadMore && !isLoadingMore && top+scrollTop < 70 && list.length > 0) {
				setIsLoadingMore(true)
				socket.GetMore(list[list.length-1].seq)
			}
		}
	}, [updateScroll])

	const [openEmojiDialog, setOpenEmojiDialog] = useState(false)
	const onEmojiClick = (event, emojiObject) => {
		if (emojiObject != undefined) {
			setMessage(message + emojiObject.emoji)
		}
		setOpenEmojiDialog(false)
	}

	const [newMessage, setNewMessage] = useState(undefined)
	const [socket, setSocket] = useState(undefined)

	useEffect(() => {
		// reset edit options
		setMessage('')
		setAllowedToChat(false)
		setError(undefined)
		setList([])
		// create socket
		const socket = ChatSocket(room)
		setSocket(socket)
		const error = (err) => {
			setError('was unable to establish a connection with the server (' + err.message + ')')
			setCanLoadMore(false)
		}
		socket.OnErrorListener(error)
		const status = (stat) => {
			if (stat === 'allowed to chat') {
				setAllowedToChat(true)
			} else {
				setAllowedToChat(false)
			}
		}
		socket.OnStatusListener(status)
		const disconnect = () => {
			setError('disconnected duo to invalid room id number or server problem, try refresh the page to reload the chat again.')
			setCanLoadMore(false)
		}
		socket.OnDisconnectedListener(disconnect)
		const message = (msgs) => {
			if(msgs.length === 0) {
				setCanLoadMore(false)
			}
			setNewMessage(msgs)
		}
		socket.OnMessageListener(message)
		const more = (msgs) => {
			setNewMessage(msgs)
			if (!msgs || msgs.length === 0) {
				setCanLoadMore(false)
			}
			setIsLoadingMore(false)
		}
		socket.OnMoreListener(more)
		const scrollInterval = setInterval(() => setUpdateScroll(Date.now()), 2000)
		return () => {
			socket.RemoveOnErrorListener(error)
			socket.RemoveOnStatusListener(status)
			socket.RemoveOnDisconnectedListener(disconnect)
			socket.RemoveOnMessageListener(message)
			socket.RemoveOnMoreListener(more)
			socket.Disconnect()
			clearInterval(scrollInterval)
		}
	}, [isMember])

	useEffect(() => {
		if (newMessage) {
			let temp = [...newMessage, ...list]
			temp.sort((a, b) => b.seq - a.seq)
			setList(temp)
		}
	}, [newMessage])

	function sendMessage() {
		if(!message || message.trim() === '') {
			return
		}
		socket.SendMessage(message)
		setMessage('')
	}

	return (
		<Box className={classes.container}>
			<Typography variant="h5"> Chat </Typography>
			{
				error ?
					<Box className={classes.error}>
						<Alert severity='error'> {error} </Alert>
					</Box>
					:
					<List 
						dense={true} 
						className={classes.list} 
						ref={messagesListRef}>
						{
							list.map(m => {
								return (
									<React.Fragment key={m.id}>
										<ListItem alignItems="flex-start">
											<ListItemAvatar>
												<UserAvatar userId={m.userId} circle size="24" />
											</ListItemAvatar>
											<ListItemText
												primary={
													<>
														<span className={classes.messageInfo}>
															<span> {m.name} </span>
															<span> {moment(m.time).calendar()} </span>
														</span>
													</>
												}
												secondary={
													<>
														<span className={classes.messageText}>
															{m.message}
														</span>
													</>
												}
											/>
										</ListItem>
										<Divider />
									</React.Fragment>
								)
							})
						}
						{
							canLoadMore ?
								<>
									<ListItem alignItems="flex-start" className={classes.loading}>
										Loading...
									</ListItem>
									<Divider />
								</>
								: undefined
						}
					</List>
			}

			<FilledInput
				fullWidth
				variant="filled"
				multiline
				placeholder="Type your message here"
				disabled={!allowedToChat}
				rowsMax={6}
				value={message}
				onChange={(event) => setMessage(event.target.value)}
				inputProps={{'aria-label': 'description'}}
				endAdornment={
					<>
						<IconButton
							aria-label="emoji"
							onClick={() => setOpenEmojiDialog(true)}
							disabled={!allowedToChat}>
							<Icon> sentiment_satisfied_alt </Icon>
						</IconButton>
						<IconButton
							aria-label="send"
							onClick={() => sendMessage()}
							disabled={!allowedToChat}>
							<Icon> send </Icon>
						</IconButton>
					</>
				} />
			<Dialog onClose={onEmojiClick} aria-labelledby="simple-dialog-title" open={openEmojiDialog}>
				<Picker style={classes.emoji} onEmojiClick={onEmojiClick} />
			</Dialog>
		</Box>
	)
}

export default RoomChat