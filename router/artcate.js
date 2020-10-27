const express = require('express')

const router = express.Router()

const artcate = require('../router_handler/artcate')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章分类的验证模块
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate')


//获取文章分类列表
router.get('/cates', artcate.getArticleCates)

//新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artcate.addArticleCates)

// 删除文章分类的路由
router.delete('/deletecate/:id', expressJoi(delete_cate_schema), artcate.deleteCateById)

// 根据 id 获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), artcate.getArticleById)

//根据 id 更新文章分类
router.put('/updatecate', expressJoi(update_cate_schema), artcate.updateCateById)



module.exports = router