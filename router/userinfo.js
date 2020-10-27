const express = require('express')
const { route } = require('./user')
const router = express.Router()

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//导入验证规则
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')




const userinfo = require('../router_handler/userinfo')

//获取用户信息
router.get('/userinfo', userinfo.getUserInfo)
//更新用户的信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo.updateUserInfo)
// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo.updatePassword)
//更换头像
router.post('/update/avatat', expressJoi(update_avatar_schema), userinfo.updateAvatar)



module.exports = router