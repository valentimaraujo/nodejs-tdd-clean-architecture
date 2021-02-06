const express = require('express')
const app = express()
const setupApp = require('./setup')

setupApp(app)
app.get('/api/valente', (req, res) => {
  res.send('valente')
})
module.exports = app
