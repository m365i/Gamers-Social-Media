
import * as Mui from '@material-ui/core'
import * as MuiLab from '@material-ui/lab'
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react'
import {actionAfterEditRoom, selectRoom} from '../state/roomSlice'
import {useDispatch, useSelector} from 'react-redux'
import clsx from 'clsx'
import Joi from 'joi'
import {autoCompleteGame, create as createRoom} from '../services/roomAPI'
import {
	edit as gameEditRoom
} from '../services/roomAPI'

function _InputRoom({init, disabled}, ref) { // init should be a state so it won't changed in repeated calls 

	const [name, setName] = useState('')
	const [nameValidation, setNameValidation] = useState(undefined)
	const [game, setGame] = useState('')
	const [inputGame, setInputGame] = useState('')
	const [gameValidation, setGameValidation] = useState(undefined)
	const [platform, setPlatform] = useState('Pc')
	const [description, setDescription] = useState('')
	const [descriptionValidation, setDescriptionValidation] = useState(undefined)

	const [gameSelectOptions, setGameSelectOptions] = useState([])
	const [gameSelectLoading, setGameSelectLoading] = useState(false)

	useImperativeHandle(ref, () => ({
		validate: () => {
			setNameValidation(undefined)
			setGameValidation(undefined)
			setDescriptionValidation(undefined)
			let valid = true
			if (name === '') {
				setNameValidation('this field is reqired')
				valid = false
			} else if (Joi.string().min(3).max(64).pattern(/^[a-zA-Z0-9][a-zA-Z0-9 -_'+]+$/).validate(name).error) {
				// eslint-disable-next-line
				setNameValidation("name must start and end with an alphanumerical letter, then two or more alphanumerical letters or symbols [space]-_'+")
				valid = false
			}
			if (!game) {
				setGameValidation('this field is reqired')
				valid = false
			}
			if (description !== '' && Joi.string().max(256).validate(description).error) {
				setDescriptionValidation('maximum 256 characters allowed')
				valid = false
			}
			return valid
		},
		data: () => {
			return {
				name,
				game: game.name,
				platform,
				description
			}
		}
	}))

	useEffect(() => {
		if(init) {
			setName(init.name)
			setGame({name: init.game})
			setInputGame({name: init.game})
			setPlatform(init.platform)
			setDescription(init.description)
		}
	}, [init])

	function onNameChange(event) {
		setName(event.target.value)
		setNameValidation(undefined)
	}

	function onDescriptionChange(event) {
		setDescription(event.target.value)
		setDescriptionValidation(undefined)
	}

	function onPlatrormChange(platform) {
		setPlatform(platform)
	}
	
	useEffect(() => {
		let active = true

		setGameValidation(undefined)
	
		if (inputGame === '') {
			setGameSelectOptions(game ? [game] : [])
			return undefined
		}
	
		setGameSelectLoading(true)
		autoCompleteGame(inputGame)
			.then(results => {
				if (active) {
					let newOptions = []

					if (game) {
						newOptions = [game]
					}
			
					if (results) {
						newOptions = [...newOptions, ...results.data]
					}

					setGameSelectOptions(newOptions)
					setGameSelectLoading(false)
				}
			})
	
		return () => {
			active = false
		}
	}, [game, inputGame])
	
	return (
		<form noValidate>
			<Mui.TextField
				name='name'
				label='Name'
				type='text'
				variant='outlined'
				onChange={onNameChange}
				value={name}
				disabled={disabled}
				error={nameValidation !== undefined}
				helperText={nameValidation}
				required
				fullWidth
				autoFocus
				margin='normal'
				autoComplete='email'
			/>

			<br />

			<MuiLab.Autocomplete
				fullWidth
				defaultValue={init.game}
				getOptionSelected={(option, value) => option.name === value.name}
				filterOptions={(x) => x}
				loading={gameSelectLoading}
				getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
				options={gameSelectOptions}
				autoComplete
				includeInputInList
				filterSelectedOptions
				value={game}
				onChange={(event, newValue) => {
					setGameSelectOptions(newValue ? [newValue, ...gameSelectOptions] : gameSelectOptions)
					setGame(newValue)
				}}
				onInputChange={(event, newInputValue) => {
					setInputGame(newInputValue)
				}}
				renderInput={(params) => (
					<Mui.TextField
						{...params}
						label="Game"
						fullWidth
						variant="outlined"
						disabled={disabled}
						error={gameValidation !== undefined}
						helperText={gameValidation}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{gameSelectLoading ? <Mui.CircularProgress color="inherit" size={20} /> : null}
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				)}
				renderOption={(option) => (
					<Mui.Grid container alignItems="center">
						<Mui.Grid item>
							<Mui.Avatar variant="rounded" alt="cover" src={option.image} />
						</Mui.Grid>
						<Mui.Grid item xs>
							<Mui.Typography variant="body2">
								&nbsp; {option.name}
							</Mui.Typography>
						</Mui.Grid>
					</Mui.Grid>
				)}
			/>

			<br />

			<Mui.ButtonGroup color="primary" aria-label="outlined primary button group" disabled={disabled}>
				{
					['Pc', 'Xbox', 'Playstation', 'Android', 'Psp', 'Apple'].map(p => {
						return (
							<Mui.Button key={p} variant={clsx({'contained':(platform === p)})} onClick={() => onPlatrormChange(p)}>{p}</Mui.Button>
						)
					})
				}
			</Mui.ButtonGroup>

			<br />
			
			<Mui.TextField
				name='description'
				label='description'
				type='text'
				rows={8}
				multiline
				variant='outlined'
				onChange={onDescriptionChange}
				value={description}
				disabled={disabled}
				error={descriptionValidation !== undefined}
				helperText={descriptionValidation}
				required
				fullWidth
				margin='normal'
			/>
		</form>
	)
}

export const InputRoom = forwardRef(_InputRoom)

export function DialogEditRoom({open, close}) {

	const {roomId, name, game, platform, description} = useSelector(selectRoom)
	const dispatch = useDispatch()

	const [inputInvalid, setInputInvalid] = useState(false)

	const [initInput, setInitInput] = useState(undefined)

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const input = useRef()

	useEffect(() => {
		setInitInput({name, game, platform, description})
	}, [name, game, platform, description])

	function save() {
		if(input.current.validate()) {
			const {name, game, platform, description} = input.current.data()
			setLoading(true)
			gameEditRoom(roomId, name, game, platform, description)
				.then(() => {
					dispatch(actionAfterEditRoom({name, game, platform, description}))
					close()
				})
				.catch(err => {
					setError(err.message)
					console.error(err)
				})
				.finally(() => {
					setLoading(false)
				})
		} else {
			setInputInvalid(true)
		}
	}

	return (
		<Mui.Dialog
			open={open}
			onClose={close}
			aria-labelledby="responsive-dialog-title" >
			<Mui.DialogTitle id="responsive-dialog-title">Edit Room Properties</Mui.DialogTitle>
			<Mui.DialogContent>
				<InputRoom ref={input} init={initInput} disabled={loading} onClick={() => setInputInvalid(false)} />
				{
					inputInvalid ?
						<MuiLab.Alert severity="error">Error: input invalid </MuiLab.Alert>
						: undefined
				}
			</Mui.DialogContent>
			{
				error ?
					<MuiLab.Alert severity="error">{error}</MuiLab.Alert>
					: undefined
			}
			<Mui.DialogActions>
				<Mui.Button
					disabled={loading} 
					autoFocus 
					onClick={close} 
					color="primary">
					Discard
				</Mui.Button>
				<Mui.Button 
					disabled={loading} 
					onClick={save} 
					color="primary" 
					autoFocus>
					{
						loading ?
							<>
								<Mui.CircularProgress size={15} color="inherit" />
								&nbsp;
								&nbsp;
							</>
							: undefined
					}
					Save
				</Mui.Button>
			</Mui.DialogActions>
		</Mui.Dialog>
	)
}

export function DialogCreateRoom({open, close}) {

	const [inputInvalid, setInputInvalid] = useState(false)

	const input = useRef()

	function save() {
		if(input.current.validate()) {
			const {name, game, platform, description} =  input.current.data()
			createRoom(name, game, platform, description)
				.then(res => {
					close()
					const id = res.data
					window.open('/room/' + id)
				})
		} else {
			setInputInvalid(true)
		}
	}

	return (
		<Mui.Dialog
			open={open}
			onClose={close}
			aria-labelledby="responsive-dialog-title" >
			<Mui.DialogTitle id="responsive-dialog-title">Create Room</Mui.DialogTitle>
			<Mui.DialogContent>
				<InputRoom ref={input} onClick={() => setInputInvalid(false)} />
				{
					inputInvalid ?
						<MuiLab.Alert severity="error">Error: input invalid </MuiLab.Alert>
						: undefined
				}
			</Mui.DialogContent>
			<Mui.DialogActions>
				<Mui.Button onClick={save} color="primary" autoFocus>
					Create
				</Mui.Button>
			</Mui.DialogActions>
		</Mui.Dialog>
	)
}