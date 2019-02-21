const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const authRoutes = require('./routes/authRoutes')
require('./models/User') // must be required BEFORE passport file below
require('./services/passport') // DIFFERENT from passport.js!

mongoose.connect(keys.mongoURI)
const app = express()

// .use() statements are middlewares; used to modify incoming requests
// before sending them to route handlers. Comparable to reducers in Redux
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())

authRoutes(app) // to get express app into authRoutes.js

const PORT = process.env.PORT || 5000
app.listen(PORT)


