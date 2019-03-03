const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')

const keys = require('./config/keys')
const authRoutes = require('./routes/authRoutes')
const billingRoutes = require('./routes/billingRoutes')
require('./models/User') // must be required BEFORE passport file below
require('./services/passport') // DIFFERENT from passport.js!

mongoose.connect(keys.mongoURI)
const app = express()

// .use() statements are middlewares; used to modify incoming requests
// before sending them to route handlers. Comparable to reducers in Redux
app.use(bodyParser.json()) // parse body and assign to req.body
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())

authRoutes(app) // to get express app into authRoutes.js
billingRoutes(app) // to get express app into billingRoutes.js

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets from client/build
    app.use(express.static('client/build'))
    // Express will serve up index.html for unrecognized routes
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(
            __dirname, 
            'client', 
            'build', 
            'index.html'
        ))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)


