'use strict'

const morgan = require('morgan')
const express = require('express')
const app = express()

const production = process.env.NODE_ENV === 'production'

app.set('view engine', 'ejs')
app.set('layout', 'layout.html.ejs')

if (production) {
  app.enable('trust proxy')
}

app.use(morgan(production ? 'combined' : 'dev'))
app.use((req, res, next) => {
  if (production && !req.secure) return res.redirect(301, 'https://' + req.headers.host + req.originalUrl)
  next()
})
app.use(express.static('public'))
app.use(require('./routes'))

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('listening on', server.address().port)
})
