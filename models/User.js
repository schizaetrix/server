const mongoose = require('mongoose')
const { Schema } = mongoose
// ^ deconstruction of 'const Schema = mongoose.Schema'

const userSchema = new Schema({
    googleId: String
})

mongoose.model('users', userSchema)