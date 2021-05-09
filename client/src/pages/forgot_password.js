
import React from 'react'
import {forgotPassword} from '../services/authAPI'
import {useState} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import * as Mui from '@material-ui/core'
import * as MuiLab from '@material-ui/lab'
import {makeStyles} from '@material-ui/core/styles'
import SideViewFormLayout from '../components/SideViewFormLayout'

const useStyles = makeStyles((theme) => ({
	link: {
		margin: theme.spacing(1),
	},
	submit: {
		margin: '2rem auto',
		borderRadius: '30px',
		padding: '0.5rem 0',
	},
	progress: {
		marginRight: '2rem',
	},
	title: {
		margin: theme.spacing(2),
	},
}))

export default function ForgotPassword() {
	const classes = useStyles()

	const [email, setEmail] = useState('')
	const [emailValidation, setEmailValidation] = useState(undefined)

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()
	const [success, setSuccess] = useState(false)

	function onEmailChange(event) {
		setEmail(event.target.value)
		setEmailValidation(undefined)
	}

	function onSubmit(event) {
		event.preventDefault()
		// reest
		setError(undefined)
		setLoading(true)
		setEmailValidation(undefined)
		// validate input
		let valid = true
		if (email === '') {
			setEmailValidation('this field is reqired')
			valid = false
		}
		if (!valid) {
			setLoading(false)
			return
		}
		// send request
		forgotPassword(email)
			.then(() => {
				setSuccess(true)
			})
			.catch((err) => {
				if (err.response) {
					setError(err.response.data)
				} else {
					setError(err.message)
				}
				setLoading(false)
			})
	}

	if (success) {
		return (
			<SideViewFormLayout image={process.env.PUBLIC_URL + './images/photo-1496206945239-d388b467f2e6.webp'}>
				<Mui.Typography component='h1' variant='h5' className={classes.title}>
					One More Step
				</Mui.Typography>

				<MuiLab.Alert severity='success'>
					Your password reset link will shortly be sent to your email account
					<br />
					check it out for further instructions
				</MuiLab.Alert>

				<Mui.Grid container direction='column' justify='center' alignItems='center'>
					<Mui.Grid item xs={12}>
						<Link to='/' className={classes.link}>
							<Mui.Typography> Go back home </Mui.Typography>
						</Link>
					</Mui.Grid>
				</Mui.Grid>
			</SideViewFormLayout>
		)
	}

	return (
		<SideViewFormLayout image={process.env.PUBLIC_URL + './images/photo-1496206945239-d388b467f2e6.webp'}>
			<Mui.Typography component='h1' variant='h5' className={classes.title}>
				Reset Your Password
			</Mui.Typography>

			<MuiLab.Alert severity='info'>
				Enter your account email below
				<br />
				a link to reaet your password will be sent to your inbox
			</MuiLab.Alert>

			<form noValidate>
				<Mui.TextField
					name='email'
					label='Email Address'
					type='text'
					variant='outlined'
					onChange={onEmailChange}
					value={email}
					disabled={loading}
					error={emailValidation !== undefined}
					helperText={emailValidation}
					required
					fullWidth
					autoFocus
					margin='normal'
					autoComplete='email'
				/>

				<Mui.Button
					type='submit'
					fullWidth
					variant='contained'
					color='primary'
					className={classes.submit}
					onClick={onSubmit}
					disabled={loading} >
					{loading ?
						<Mui.CircularProgress color='inherit' size={20} className={classes.progress} /> : undefined}
					Submit
				</Mui.Button>
				<Mui.Box display={clsx({'none': error === undefined})}>
					<MuiLab.Alert severity='error'>
						{error}
					</MuiLab.Alert>
				</Mui.Box>
			</form>
		</SideViewFormLayout>
	)
}
