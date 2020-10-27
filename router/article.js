const express = require('express')

const router = express.Router()

const article = require('../router_handler/article')

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_article_schema, update_article_schema } = require('../schema/article')



// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })



//发布新文章
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article.addarticle)


//获取文章的列表数据
router.get('/list', article.getarticle)


//根据 Id 删除文章数据
router.delete('/delete/:id', article.deletearticle)


//根据 Id 获取文章详情
router.get('/:id', article.getidarticle)


//根据 Id 更新文章信息
router.put('/edit', upload.single('cover_img'), expressJoi(update_article_schema), article.updatearticle)



module.exports = router