const express = require('express')
const app     = express()
const hbs     = require('hbs')
const path    = require('path')
const bodyParser = require('body-parser');


let taskController = require('./../controllers/task.controller')


const myViews     = path.join(__dirname,"../resources/views")
const myLayouts   = path.join(__dirname,"../resources/layouts")
const staticFiles = path.join(__dirname,'../public')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticFiles))
app.set('view engine', 'hbs')
app.set('views', myViews)
hbs.registerPartials(myLayouts)

app.get('',taskController.showAllTasks)
app.get('/tasks/edit',taskController.editGet)
app.post('/tasks/edit', taskController.editPost)
app.get('/tasks/create',taskController.addTaskGet)
app.post('/tasks/create', taskController.addTaskPost)
app.post('/tasks/delete',taskController.deleteTask)
app.get('/tasks/show/:id/',taskController.showTask)
app.post('/tasks/change-status',taskController.changeStatus)


module.exports = app