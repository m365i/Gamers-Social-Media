
import { login } from '../services/authAPI'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import * as Mui from '@material-ui/core'
import * as MuiLab from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import SideViewFormLayout from '../components/SideViewFormLayout'
import { fetchUser } from '../state/userSlice'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    link: {
        margin: theme.spacing(1)
    },
    submit: {
        margin: '2rem auto',
        borderRadius: '30px',
        padding: '0.5rem 0'
    },
    progress: {
        marginRight: '2rem'
    },
    title: {
        margin: theme.spacing(2)
    }
  }))

export default function Login(props) {

    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [emailValidation, setEmailValidation] = useState(undefined)
    const [password, setPassword] = useState('')
    const [passwordValidation, setPasswordValidation] = useState(undefined)
    const [remember_me, setRememberMe] = useState(false)

    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const dispatch = useDispatch()

    function onEmailChange(event) {
        setEmail(event.target.value)
        setEmailValidation(undefined)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
        setPasswordValidation(undefined)
    }

    function onRememberMeChange(event) {
        setRememberMe(event.target.checked)
    }

    function onLogin(event) {
        event.preventDefault()
        // reest
        setError(undefined)
        setLoading(true)
        setEmailValidation(undefined)
        setPasswordValidation(undefined)
        // validate input
        let valid = true
        if(email === '') {
            setEmailValidation("this field is reqired")
            valid = false
        }
        if(password === '') {
            setPasswordValidation("this field is reqired")
            valid = false
        }
        if(!valid) {
            setLoading(false)
            return
        }
        // attempt login
        login(email, password, remember_me)
            .then(res => {
                dispatch(fetchUser())
                history.replace('/members')
            })
            .catch(err => {
                if(err.response){
                    setError(err.response.data)
                } else {
                    setError(err.message)
                }
                setLoading(false)
            })
    }

    return (
        <SideViewFormLayout image={process.env.PUBLIC_URL + "./images/photo-1511193311914-0346f16efe90.webp"}>
            <Mui.Typography component="h1" variant="h5" className={classes.title}>
                Welcome back!
            </Mui.Typography>
            
            { // signup message 
            (props.location.state && props.location.state.signup) ? 
                <MuiLab.Alert severity="success">
                    <>
                        Congratulation! your account has been successfuly created. 
                        <br />
                        you can now log in to cuntinue
                    </>
                </MuiLab.Alert>
                :
                undefined }
            
            <form noValidate>
                <Mui.TextField
                    name="email"
                    label="Email Address"
                    type="text"
                    variant="outlined"
                    onChange={onEmailChange} 
                    value={email} 
                    disabled={loading}
                    error={emailValidation !== undefined}
                    helperText={emailValidation}
                    required
                    fullWidth
                    autoFocus
                    margin="normal"
                    autoComplete="email"
                />

                <Mui.TextField
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={onPasswordChange} 
                    value={password} 
                    disabled={loading}
                    error={passwordValidation !== undefined}
                    helperText={passwordValidation}
                    required
                    fullWidth
                    margin="normal"
                />

                <Mui.FormControlLabel
                    control={<Mui.Checkbox 
                                    value="remember" 
                                    color="primary"
                                    onChange={onRememberMeChange} 
                                    checked={remember_me}
                                    disabled={loading} />}
                    label="Remember me"
                    required
                    margin="normal"
                />
                
                <Mui.Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onLogin} 
                    disabled={loading} >
                    { loading ?
                        <Mui.CircularProgress color="inherit" size={20} className={classes.progress} />
                        :
                        undefined }
                    Sign in
                </Mui.Button>
                <Mui.Box display={clsx({"none": error === undefined})}>
                    <MuiLab.Alert severity="error">
                        {error}
                    </MuiLab.Alert>
                </Mui.Box>
                <Mui.Grid container direction="column" justify="center" alignItems="center">
                    <Mui.Grid item xs={12}>
                        <Link to="/forgot-password" className={classes.link}> 
                            <Mui.Typography> Forgot password? </Mui.Typography>
                        </Link>
                    </Mui.Grid>
                    <Mui.Grid item xs={12} className={classes.link}>
                        <Link to="/signup"> 
                            <Mui.Typography> Don't have an account? Sign Up </Mui.Typography>
                        </Link>
                    </Mui.Grid>
                </Mui.Grid>
            </form>
        </SideViewFormLayout>
    )
}