// keys.js - figure out what credentials to return

if (process.env.NODE_ENV === 'production') {
    // return prod set of keys
    module.exports = require('./prod')
} else {
    // return det set of keys
    module.exports = require('./dev')
}
