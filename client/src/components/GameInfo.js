
import React, {useEffect, useState} from 'react'
import axios from '../services/axios.config'
import {Box, CircularProgress, Grid, Paper, Typography} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	container: {
		maxWidth: 'inherit',
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
		let relevant = true
		setLoading(true)
		axios.get('/games/info', { params: { name }})
			.then(({data}) => {
				if(relevant) {
					setGame(data)
					setLoading(false)
				}
			})
			.catch((err) => {
				if(relevant) {
					setError(err.message)
					setLoading(false)
				}
			})
		return () => {
			relevant = false
		}
	}, [name])

	if(loading) {
		return (
			<Box textAlign="center" m={3}>
				<CircularProgress />
			</Box>
		)
	}

	if(error) {
		return (
			<Alert severity="error">Error: could not load the game &quot;{name}&quot; [reson: {error}]</Alert>
		)
	}

	return (
		<Paper className={classes.container}> 
			<Grid container spacing={2} direction="row-reverse">
				<Grid item xs>
					<img src={game.image} className={classes.image} alt="game cover" />
				</Grid>
				<Grid item xs className={classes.info}>
					<Typography variant="h5"> {game.name} </Typography>
					<br />
					<Typography variant="subtitle2"> About This Game </Typography>
					<hr />
					<Typography variant="body2">
						<b>Developers:</b> {game.developer.split(';').join(', ')} <br />
						<b>Platforms:</b> {game.platforms.split(';').join(', ')} <br />
						<b>Release date:</b> {game.release_date} <br />
						<b>Description:</b> {game.short_description} <br />
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default GameInfo