const express = require('express')

const app = express()

const joi = require('@hapi/joi')

const userRouter = require('./router/user')
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
//文章功能
const artcateRouter = require('./router/artcate')
//文章管理
const articleRouter = require('./router/article')


// 解决跨域问题
const cors = require('cors')
app.use(cors())

//解析token的中间件
const expressJWT = require('express-jwt')
//导入配置文件
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))
// 配置解析 json 格式的表单数据的中间件
app.use(express.json())

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))


//封装res.cc 响应 处理失败 的结果
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            message: err instanceof Error ? err.message : err,
            status,
        })
    }
    next()
})



//路由
app.use('/api', userRouter)
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)

app.use('/my/article', artcateRouter)

app.use('/my/article', articleRouter)




//错误中间件
app.use((err, req, res, next) => {
    // return console.log(err);
    console.log(err);
    if (err instanceof joi.ValidationError) return res.cc(err)
    //身份认证失败
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err)
})

app.listen(8080, () => {
    console.log('http://127.0.0.1:8080');
})