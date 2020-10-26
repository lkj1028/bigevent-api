const express = require('express')

const router = express.Router()

const userHandle = require('../router_handler/user')

//验证表单数据
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')


router.post('/reguser', expressJoi(reg_login_schema), userHandle.reguser)

router.post('/login', expressJoi(reg_login_schema), userHandle.login)


module.exports = router