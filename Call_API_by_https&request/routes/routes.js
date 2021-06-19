const express = require('express')
const router = express.Router()
const callAPI = require('../controllers/callAPI.controller')

router.get('/callbyrequest',callAPI.callAPIREQUEST)
router.get('/callbyhttps',callAPI.callAPIHTTPS)

module.exports = router