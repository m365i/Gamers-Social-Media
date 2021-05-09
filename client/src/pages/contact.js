
import { contact } from '../services/contactAPI'
import { useState } from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import * as Mui from '@material-ui/core'
import * as MuiLab from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import SideViewFormLayout from '../components/SideViewFormLayout'
import Joi from 'joi'

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

export default function Contact(props) {

    const classes = useStyles()

    const [name, setName] = useState('')
    const [nameValidation, setNameValidation] = useState(undefined)
    const [email, setEmail] = useState('')
    const [emailValidation, setEmailValidation] = useState(undefined)
    const [message, setMessage] = useState('')
    const [messageValidation, setMessageValidation] = useState(undefined)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)

    function onNameChange(event) {
        setName(event.target.value)
        setNameValidation(undefined)
    }

    function onEmailChange(event) {
        setEmail(event.target.value)
        setEmailValidation(undefined)
    }

    function onMessageChange(event) {
        setMessage(event.target.value)
        setMessageValidation(undefined)
    }

    function onSubmit(event) {
        event.preventDefault()
        // reest
        setError(undefined)
        setLoading(true)
        setNameValidation(undefined)
        setEmailValidation(undefined)
        setMessageValidation(undefined)
        // validate input
        let valid = true
        if(name === '') {
            setNameValidation("this field is reqired")
            valid = false
        }
        if(email === '') {
            setEmailValidation("this field is reqired")
            valid = false
        } else if(Joi.string().email({tlds: { allow: false }}).validate(email).error) {
            setEmailValidation("this is not a valid email address")
            valid = false
        }
        if(message === '') {
            setMessageValidation("this field is reqired")
            valid = false
        }
        if(!valid) {
            setLoading(false)
            return
        }
        // send request
        contact(name, email, message)
            .then(res => {
                setSuccess(true)
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

    if(success) {
        return (
            <SideViewFormLayout image={process.env.PUBLIC_URL + "./images/photo-1504716325983-cb91edab7e7d.webp"}>
                <Mui.Typography component="h1" variant="h5" className={classes.title}>
                    Message Has Been Sent!
                </Mui.Typography>

                <MuiLab.Alert severity="success">
                    Out team will be looking in to it as fast as possible!
                </MuiLab.Alert>

                <Mui.Grid container direction="column" justify="center" alignItems="center">
                    <Mui.Grid item xs={12}>
                        <Link to="/" className={classes.link}> 
                            <Mui.Typography> Go back home </Mui.Typography>
                        </Link>
                    </Mui.Grid>
                </Mui.Grid>
            </SideViewFormLayout>
        )
    }

    return (
        <SideViewFormLayout image={process.env.PUBLIC_URL + "./images/photo-1504716325983-cb91edab7e7d.webp"}>
                        
            <Mui.Typography component="h1" variant="h5" className={classes.title}>
                Contact Us
            </Mui.Typography>
            
            <form noValidate>
                <Mui.TextField
                    name="name"
                    label="Name"
                    type="text"
                    variant="outlined"
                    onChange={onNameChange} 
                    value={name} 
                    disabled={loading}
                    error={nameValidation !== undefined}
                    helperText={nameValidation}
                    required
                    fullWidth
                    autoFocus
                    margin="normal"
                />

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
                    margin="normal"
                />

                <Mui.TextField
                    name="message"
                    label="Message"
                    type="text"
                    rows={8}
                    multiline
                    variant="outlined"
                    onChange={onMessageChange} 
                    value={message} 
                    disabled={loading}
                    error={messageValidation !== undefined}
                    helperText={messageValidation}
                    required
                    fullWidth
                    margin="normal"
                />
                
                <Mui.Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmit} 
                    disabled={loading} >
                    { loading ?
                        <Mui.CircularProgress color="inherit" size={20} className={classes.progress} />
                        :
                        undefined }
                    Submit
                </Mui.Button>
                <Mui.Box display={clsx({"none": error === undefined})}>
                    <MuiLab.Alert severity="error">
                        {error}
                    </MuiLab.Alert>
                </Mui.Box>
            </form>

        </SideViewFormLayout>
    )
}