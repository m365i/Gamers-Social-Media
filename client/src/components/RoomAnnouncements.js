
import React, {useState} from 'react'
import * as Mui from '@material-ui/core'
import * as MuiLab from '@material-ui/lab'
import {makeStyles} from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import Picker from 'emoji-picker-react'
import {useDispatch, useSelector} from 'react-redux'
import {deleteAnnouncement, makeAnnouncement, selectRoom} from '../state/roomSlice'

const useStyles = makeStyles(() => ({
	container: {
		minWidth: '400px',
		height: '400px',
		display: 'flex',
		flexDirection: 'column'
	},
	list: {
		overflowY: 'auto',
		height: '100%'
	}
}))

function RoomAnnouncements() {
	const classes = useStyles()

	const {isOwner, announcements} = useSelector(selectRoom)
	const dispatch = useDispatch()

	const [message, setMessage] = useState(undefined)

	const [openEmojiDialog, setOpenEmojiDialog] = useState(false)
	const onEmojiClick = (event, emojiObject) => {
		if (emojiObject != undefined) {
			setMessage(message + emojiObject.emoji)
		}
		setOpenEmojiDialog(false)
	}
	
	function deleteMessage(announcementIndex) {
		const announcementId = announcements[announcementIndex]._id
		dispatch(deleteAnnouncement(announcementId))
	}
	
	function sendMessage() {
		if(!message || message.trim() === '') {
			return
		}
		dispatch(makeAnnouncement(message))
		setMessage('')
	}

	return (
		<Mui.Box className={classes.container}> 
			<Mui.Typography variant="h5"> Announcements </Mui.Typography>
			<Mui.List className={classes.list}>
				{
					announcements.map((a, i) => (
						<React.Fragment key={a._id}>
							<Mui.ListItem>
								<Mui.ListItemText> 
									<MuiLab.Alert
										onClose={isOwner ? () => deleteMessage(i) : undefined}
										severity="success"
										icon={<Icon>campaign</Icon>}>{a.message}</MuiLab.Alert>
								</Mui.ListItemText>
							</Mui.ListItem>
						</React.Fragment>
					))
				}
			</Mui.List>

			{ 
				isOwner ?
					<>
						<Mui.FilledInput
							fullWidth
							variant="filled"
							multiline
							placeholder="Type your message here"
							disabled={!isOwner}
							rowsMax={6}
							value={message}
							onChange={(event) => setMessage(event.target.value)}
							inputProps={{'aria-label': 'description'}}
							endAdornment={
								<>
									<Mui.IconButton
										aria-label="emoji"
										onClick={() => setOpenEmojiDialog(true)}
										disabled={!isOwner}>
										<Icon> sentiment_satisfied_alt </Icon>
									</Mui.IconButton>
									<Mui.IconButton
										aria-label="send"
										onClick={() => sendMessage()}
										disabled={!isOwner}>
										<Icon> send </Icon>
									</Mui.IconButton>
								</>
							} />
						<Mui.Dialog onClose={onEmojiClick} aria-labelledby="simple-dialog-title" open={openEmojiDialog}>
							<Picker style={classes.emoji} onEmojiClick={onEmojiClick} />
						</Mui.Dialog>
					</>
					: undefined
			}
		</Mui.Box>
	)
}

export default RoomAnnouncements