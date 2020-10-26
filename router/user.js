const express = require('express')

const router = express.Router()

const routeruser = require('../router_handler/user')

router.post('/reguser', routeruser.reguser)

router.post('/login', routeruser.login)


module.exports = router