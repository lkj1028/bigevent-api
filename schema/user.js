const joi = require('@hapi/joi')
/**
* string() 值必须是字符串
* alphanum() 值只能是包含 a-zA-Z0-9 的字符串
* min(length) 最小长度
* max(length) 最大长度
* required() 值是必填项，不能为 undefined
* pattern(正则表达式) 值必须符合正则表达式的规则
* joi.ref('oldPwd')` 表示 `newPwd` 的值必须和 `oldPwd` 的值保持一致
* `joi.not(joi.ref('oldPwd'))` 表示 `newPwd` 的值不能等于 `oldPwd` 的值
* `.concat()` 用于合并 `joi.not(joi.ref('oldPwd'))` 和 `password` 这两条验证规则
*/

//用户名验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().required().pattern(/^[\S]{6,12}$/)



//定义id,nickname,email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()




// 登录和注册表单的验证规则对象
exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password
    }
}


//验证规则对象 -更新用户信息
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}


// 重置密码验证规则对象
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    }
}

