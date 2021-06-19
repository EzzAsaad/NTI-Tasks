const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

// router.get('',(req,res)=>{
//     res.send("good")
// })

router.get('/:username/profile',userController.showProfile)
router.get('/register',userController.showRegisterForm)
router.post('/register',userController.registeration)

router.get('/login',userController.showLoginForm)
router.post('/login',userController.login)

router.get('/delete/:username',userController.deleteAccount)
router.get('/edit/:username',userController.editGet)
router.post('/edit',userController.editPost)

router.get('/show/:username',userController.showData)

module.exports = router