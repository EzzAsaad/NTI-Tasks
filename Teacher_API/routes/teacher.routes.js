const express = require('express')
const routers = new express.Router()
const teacherController = require("../controllers/teacher.controller")

routers.post('/register',teacherController.register)
routers.get('/all',teacherController.all)
routers.get('/single/:id',teacherController.single)
routers.get('/delete/:id',teacherController.Delete)
routers.post('/update/:id',teacherController.Update)




module.exports = routers