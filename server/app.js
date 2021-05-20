var express = require('express')
var app = express()
var path = require('path')
require('dotenv').config()

// server
var port = parseInt(process.env.PORT)
var httpServer = require('http').createServer(app)

// log requests
var morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// core
var cors = require('cors')
var corsOptions = {
	origin: [process.env.CLINET_URL, process.env.SERVER_URL],
	credentials: true
}
app.use(cors(corsOptions))

// tools
var cookieParser = require('cookie-parser')
var session = require('express-session')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
var sessionMiddleware = session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		sameSite: 'strict'
	},
})
app.use(sessionMiddleware)
app.use(express.static(path.join(__dirname, 'public')))

// auth
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy
var User = require('./models/user')

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, User.authenticate))
passport.serializeUser(User.serializeUser)
passport.deserializeUser(User.deserializeUser)

var passportInitialize = passport.initialize()
var passportSession = passport.session()
app.use(passportInitialize)
app.use(passportSession)

// socket-io chat setup
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
var io = require('socket.io')(httpServer, {
	path: '/api/room/chat',
	cors: corsOptions
})
// session support, user found at -> socket.request.user
io.use(wrap(sessionMiddleware))
io.use(wrap(passportInitialize))
io.use(wrap(passportSession))
// routes
require('./controllers/room').chat(io)

// database
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})

// swagger
var swaggerUi = require('swagger-ui-express')
var swaggerDocument = require('yamljs').load('./swagger.yml')
// for more info visit: https://swagger.io/docs/specification/basic-structure/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// routes
var apiRouter = require('./routes/index')
app.use('/api', apiRouter)

httpServer.listen(port, function () {
	console.log('Listening on http://localhost:%s', port)
})
