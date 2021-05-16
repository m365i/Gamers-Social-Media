
import React, {useEffect, useState} from 'react'
import axios from '../services/axios.config'
import * as Mui from '@material-ui/core'
import * as MuiLab from '@material-ui/lab'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	container: {
		maxWidth: '900px',
		padding: '10px'
	},
	image: {
		marginTop: '10px',
		width: '100%',
		margin: '0 auto',
		display: 'block',
		minWidth: '250px',
		maxWidth: 'max-content'
	},
	info: {
		minWidth: '250px'
	}
}))

function GameInfo({name}) {
	const classes = useStyles()

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(undefined)
	const [game, setGame] = useState(undefined)

	useEffect(() => {
		setLoading(true)
		axios.get('/games/info', { params: { name }})
			.then(({data}) => {
				setGame(data)
				setLoading(false)
			})
			.catch((err) => {
				setError(err.message)
				setLoading(false)
			})
	}, [name])

	if(loading) {
		return (
			<Mui.Box textAlign="center" m={3}>
				<Mui.CircularProgress />
			</Mui.Box>
		)
	}

	if(error) {
		return (
			<MuiLab.Alert severity="error">Error: could not load the game &quot;{name}&quot; [reson: {error}]</MuiLab.Alert>
		)
	}

	return (
		<Mui.Paper className={classes.container}> 
			<Mui.Grid container spacing={2} direction="row-reverse">
				<Mui.Grid item xs>
					<img src={game.image} className={classes.image} alt="game cover" />
				</Mui.Grid>
				<Mui.Grid item xs className={classes.info}>
					<Mui.Typography variant="h5"> {game.name} </Mui.Typography>
					<br />
					<Mui.Typography variant="subtitle2"> About This Game </Mui.Typography>
					<hr />
					<Mui.Typography variant="body2">
						<b>Developers:</b> {game.developer.split(';').join(', ')} <br />
						<b>Platforms:</b> {game.platforms.split(';').join(', ')} <br />
						<b>Release date:</b> {game.release_date} <br />
						<b>Description:</b> {game.short_description} <br />
					</Mui.Typography>
				</Mui.Grid>
			</Mui.Grid>
		</Mui.Paper>
	)
}

export default GameInfo