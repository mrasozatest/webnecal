const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost/numer', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db