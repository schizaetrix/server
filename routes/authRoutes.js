const passport = require('passport')

// route handlers below...
module.exports = (app) => {
    app.get(
        '/auth/google', 
        // 'google' is the internal identifier for GoogleStrategy
        passport.authenticate('google', {
            // internal scope identifiers
            scope: ['profile', 'email']
        })
    )
    app.get(
        '/auth/google/callback',
        passport.authenticate('google')
    )
    app.get('/api/logout', (req, res) => {
        req.logout()
        res.send(req.user)
    })
    app.get('/api/current_user', (req, res) => {
        res.send(req.session)
        // res.send(req.user)
    })
}
