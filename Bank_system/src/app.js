const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const router = require('../routes/route')
//const session = require('express-session')

const staticFilesPath = path.join(__dirname,"../public")
const myViews = path.join(__dirname,"../resources/views")
const myLayout = path.join(__dirname,'../resources/layouts')


app.use(express.static(staticFilesPath))
app.set('view engine',"hbs")
app.set('views',myViews)
hbs.registerPartials(myLayout)
app.use(express.urlencoded({extended:true}))
app.use(router)



module.exports = app