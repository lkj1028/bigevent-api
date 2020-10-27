const db = require('../db/index')


//获取文章分类列表
module.exports.getArticleCates = (req, res) => {
    // 定义查询分类列表数据的 SQL 语句
    // is_delete 为 0 表示没有被 标记为删除 的数据
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'

    db.query(sql, (err, results) => {
        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results
        })
    })

}


//新增文章分类
module.exports.addArticleCates = (req, res) => {
    //判断分类名称和别名是否被占用
    const sql = `select * from ev_article_cate where name=? or alias=?`
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('别名被占用，请更换后重试！')


        // 定义插入文章分类的 sql 语句
        const sql = `insert into ev_article_cate set ?`
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败!')
            res.cc('新增文章分类成功！', 0)
        })
    })

}

//根据id删除文章
module.exports.deleteCateById = (req, res) => {
    // 1. 定义删除的 sql 语句
    const sql = `update ev_article_cate set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
        res.cc('删除文章分类成功！', 0)
    })
}


//根据 id 获取文章分类的路由
module.exports.getArticleById = (req, res) => {
    // 1. 定义根据 id 获取文章分类的 sql 语句
    const sql = `select * from ev_article_cate where id=?`
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类数据失败!')
        res.send({
            status: 0,
            message: '获取文章分类数据成功!',
            data: results[0]
        })
    })
}


//根据 id 更新文章分类
module.exports.updateCateById = (req, res) => {
    const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('别名被占用，请更换后重试！')


        // 根据 id 更新文章分类
        const sql = `update ev_article_cate set ? where Id=?`
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            console.log(err);
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败!')
            res.cc('更新文章分类成功！', 0)
        })
    })
}