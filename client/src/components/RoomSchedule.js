
import React, {useState} from 'react'
import * as Mui from '@material-ui/core'
import * as MuiLab from '@material-ui/lab'
import {makeStyles} from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import {DateTimePicker} from '@material-ui/pickers'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {deleteSchedule, makeSchedule, selectRoom} from '../state/roomSlice'

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

function RoomSchedule() {
	const classes = useStyles()

	const {isOwner, schedules} = useSelector(selectRoom)
	const dispatch = useDispatch()

	const [selectedDate, handleDateChange] = useState(null)
	
	function deleteDate(scheduleIndex) {
		const scheduleId = schedules[scheduleIndex]._id
		dispatch(deleteSchedule(scheduleId))
	}
	
	function sendDate(event) {
		event.preventDefault()
		event.stopPropagation()
		if(!selectedDate) {
			return
		}
		dispatch(makeSchedule(selectedDate))
		handleDateChange(null)
	}
	if(undefined) sendDate()

	return (
		<Mui.Box className={classes.container}> 
			<Mui.Typography variant="h5"> Schedules </Mui.Typography>
			<Mui.List className={classes.list}>
				{
					schedules.map((a, i) => (
						<React.Fragment key={a._id}>
							<Mui.ListItem>
								<Mui.ListItemText> 
									<MuiLab.Alert
										onClose={isOwner ? () => deleteDate(i) : undefined}
										severity="info"
										icon={<Icon>alarm</Icon>}>{moment(a.fromDate).calendar()}</MuiLab.Alert>
								</Mui.ListItemText>
							</Mui.ListItem>
						</React.Fragment>
					))
				}
			</Mui.List>

			{ 
				isOwner ?
					<Mui.Box display="flex" flexDirection="column">
						<DateTimePicker
							autoOk
							hideTabs
							fullWidth
							disablePast
							ampm={false}
							margin="normal"
							variant="inline"
							inputVariant="filled"
							value={selectedDate}
							onChange={handleDateChange}
							leftArrowButtonProps={{ 'aria-label': 'Prev month' }}
							rightArrowButtonProps={{ 'aria-label': 'Next month' }}
							InputProps={{
								endAdornment: (
									<Mui.InputAdornment position="end">
										<Mui.IconButton
											aria-label="event">
											<Icon> event </Icon>
										</Mui.IconButton>
										<Mui.IconButton
											aria-label="send"
											onClick={sendDate}>
											<Icon> send </Icon>
										</Mui.IconButton>
									</Mui.InputAdornment>
								),
							}}
						/>
					</Mui.Box>
					: undefined
			}
		</Mui.Box>
	)
}

export default RoomSchedule
