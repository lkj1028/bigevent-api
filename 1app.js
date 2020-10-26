const express = require('express')

const app = express()

const userRouter = require('./router/user')

// 解决跨域问题
const cors = require('cors')
app.use(cors())


// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))
// 配置解析 json 格式的表单数据的中间件
app.use(express.json())


app.use('/api', userRouter)


app.listen(8080, () => {
    console.log('http://127.0.0.1:8080');
})