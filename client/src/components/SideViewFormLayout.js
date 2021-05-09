
import React from 'react'
import CenterVertically from './CenterVertically'

import * as Mui from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: props => `url(${props.image})`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
	},
	'@global': {
		body: {
			margin: '0',
		},
	}
}))

function SideViewFormLayout({children, ...props}) {
	const classes = useStyles(props)

	return (
		<Mui.Grid container component="main" className={classes.root}>
			<Mui.Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Mui.Grid item xs={12} sm={8} md={5} component={Mui.Paper} elevation={6} square>
				<CenterVertically>
					<div className={classes.paper}>
						{children}
					</div>
				</CenterVertically>
			</Mui.Grid>
		</Mui.Grid>
	)
}

export default SideViewFormLayout
