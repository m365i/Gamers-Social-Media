
import React from 'react'
import { Box, Chip, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useSelector} from 'react-redux'
import {selectRoom} from '../state/roomSlice'
import UserAvatar from './UserAvatar'

const useStyles = makeStyles(() => ({
	container: {
		minWidth: '400px',
		height: '400px',
		display: 'flex',
		flexDirection: 'column'
	},
	list: {
		overflowY: 'auto'
	}
}))

function RoomMembers() {
	const classes = useStyles()

	const {userId, creator, members} = useSelector(selectRoom)

	return (
		<Box className={classes.container}> 
			<Typography variant="h5"> Members </Typography>
			<List className={classes.list}>
				{
					members.map(m => (
						<React.Fragment key={m.userId}>
							<ListItem>
								<ListItemAvatar>
									<UserAvatar userId={m.userId} circle size="42" />
								</ListItemAvatar>
								<ListItemText 
									primary={m.name} />
								<ListItemSecondaryAction>
									{
										(m.userId === userId) ?
											<Chip size="small" label="me" variant="outlined" />
											: undefined
									}
									{
										(m.userId === creator) ?
											<Chip size="small" label="owner" variant="outlined" />
											: undefined
									}
								</ListItemSecondaryAction>
							</ListItem>
							<Divider />
						</React.Fragment>
					))
				}
			</List>
		</Box>
	)
}

export default RoomMembers