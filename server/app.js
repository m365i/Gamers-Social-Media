var express = require('express')
var app = express()
var path = require('path')
require('dotenv').config()

// cors
var cors = require('cors')
app.use(cors({
	origin: [process.env.CLINET_URL, process.env.SERVER_URL],
	credentials: true
}))

// log requests
var morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// database
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })

// server
var port = 3001
var httpServer = require('http').createServer(app)

// swagger
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('yamljs').load('./swagger.yml')

// for more info visit: https://swagger.io/docs/specification/basic-structure/

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// tools
var cookieParser = require('cookie-parser')
var session = require('express-session')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		sameSite: 'strict'
	},
}))

// auth
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy
var User = require('./models/user')

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, User.authenticate))
passport.serializeUser(User.serializeUser)
passport.deserializeUser(User.deserializeUser)

// routes
var apiRouter = require('./routes/index')

app.use('/api', apiRouter)

app.use(express.static(path.join(__dirname, 'public')))

httpServer.listen(port, function () {
	console.log('Listening on http://localhost:%s', port)
})
