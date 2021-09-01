import {Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormGroup, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import React, {useEffect, useState} from 'react'
import UserSelector from './UserSelector'
import {useDispatch, useSelector} from 'react-redux'
import {loadInvites, makeInvite, deleteInvite, selectRoom} from '../state/roomSlice'
import UserAvatar from './UserAvatar'

export default function DialogInvite({open, setOpen}) {

	const {invites} = useSelector(selectRoom)
	const dispatch = useDispatch()

	const [user, setUser] = useState(undefined)
	const [inputInvalid, setInputInvalid] = useState(false)

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		dispatch(loadInvites())
	}, [])

	function save() {
		if(user) {
			setLoading(true)
			dispatch(makeInvite(user))
				.finally(() => {
					setLoading(false)
				})
		} else {
			setInputInvalid(true)
		}
	}

	function remove(id) {
		dispatch(deleteInvite(id))
	}

	function resetInput() {
		setUser(undefined)
	}

	return (
		<Dialog
			open={open}
			onClose={() => {
				setOpen(false)
				resetInput()
			}} >
			<DialogTitle id="responsive-dialog-title">Invite Friend</DialogTitle>
			<DialogContent>
				<FormControl component="fieldset">
					<FormGroup>
						<Typography color="textPrimary">User Email</Typography>
						<Box height="10px" />
						<UserSelector 
							value={user} 
							setValue={setUser}
							autoCompleteInputProps={{
								disabled: loading,
								style:{
									width: '300px'
								}
							}} />
					</FormGroup>
				</FormControl>
				{
					inputInvalid ?
						<Alert severity="error">Error: input invalid </Alert>
						: undefined
				}
			</DialogContent>
			<DialogActions>
				<Button 
					disabled={loading} 
					onClick={save} 
					color="primary" 
					autoFocus
					>
					{
						loading ?
							<>
								<CircularProgress size={15} color="inherit" />
								&nbsp;
								&nbsp;
							</>
							: 
							undefined
					}
					Invite
				</Button>
			</DialogActions>
			{
				invites && invites.length > 0 ?
					<DialogContent>
						<Typography variant="caption">invites</Typography>
						<List dense>
							{
								invites.map(invite => {
									return (
										<ListItem key={invite.code}>
											<ListItemAvatar>
												<UserAvatar userId={invite.userId} size="30px" circle />
											</ListItemAvatar>
											<ListItemText primary={invite.name} secondary={invite.email} />
											<ListItemSecondaryAction>
												<Box display="flex" alignItems="center">
													{
														invite.accepted !== undefined ?
															invite.accepted === true ?
																<Icon>check_circle</Icon>
																:
																<Icon>cancel</Icon>
															: undefined
													}
													<IconButton edge="end" aria-label="cancel invite" onClick={() => remove(invite.id)}>
														<Icon>delete</Icon>
													</IconButton>
												</Box>
											</ListItemSecondaryAction>
										</ListItem>
									)
								})
							}
						</List>
					</DialogContent>
					:
					undefined
			}
		</Dialog>
	)
}