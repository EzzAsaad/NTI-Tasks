const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const routes = require('../routes/routes')

const myLayouts = path.join(__dirname,'../resources/layouts')
const myView    = path.join(__dirname,'../resources/views')
const myStaticFiles = path.join(__dirname,'../public')

app.set('view engine','hbs')
app.set('views',myView)
app.use(express.static(myStaticFiles))
hbs.registerPartials(myLayouts)
app.use(routes)

module.exports = app