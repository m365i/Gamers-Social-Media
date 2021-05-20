
import React from 'react'
import * as Mui from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {useSelector} from 'react-redux'
import {selectRoom} from '../state/roomSlice'

const useStyles = makeStyles(() => ({
	container: {
		minWidth: '400px',
		height: '400px',
		display: 'flex',
		flexDirection: 'column'
	},
	list: {
		overflowY: 'auto'
	},
	memberImage: {
		backgroundColor: 'red'
	}
}))

function RoomMembers() {
	const classes = useStyles()

	const {userId, creator, members} = useSelector(selectRoom)

	return (
		<Mui.Box className={classes.container}> 
			<Mui.Typography variant="h5"> Members </Mui.Typography>
			<Mui.List className={classes.list}>
				{
					members.map(m => (
						<React.Fragment key={m.userId}>
							<Mui.ListItem>
								<Mui.ListItemAvatar>
									<Mui.Avatar className={classes.memberImage} alt={m.name} src={m.image || '/'} />
								</Mui.ListItemAvatar>
								<Mui.ListItemText 
									primary={m.name} />
								<Mui.ListItemSecondaryAction>
									{
										(m.userId === userId) ?
											<Mui.Chip size="small" label="me" variant="outlined" />
											: undefined
									}
									{
										(m.userId === creator) ?
											<Mui.Chip size="small" label="owner" variant="outlined" />
											: undefined
									}
								</Mui.ListItemSecondaryAction>
							</Mui.ListItem>
							<Mui.Divider />
						</React.Fragment>
					))
				}
			</Mui.List>
		</Mui.Box>
	)
}

export default RoomMembers