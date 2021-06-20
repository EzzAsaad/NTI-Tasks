const express = require('express')
const app = express()
const teacherRoutes = require('../routes/teacher.routes')
require("../db/db")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(teacherRoutes)

module.exports = app