const db = require('../db/index')

const path = require('path')

//发布新文章
module.exports.addarticle = (req, res) => {

    // 判断客户端是否提交了 封面图片
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,
    }


    //实现发布文章的功能
    const sql = 'insert into ev_articles set ?'
    db.query(sql, articleInfo, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('发布文章失败!')
        res.cc('发布文章成功！', 0)
    })
}


//获取文章的列表数据
module.exports.getarticle = (req, res) => {

    const sql = 'select * from ev_articles where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        console.log(err);
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章列表成功！',
            data: results
        })
    })

}


//根据 Id 删除文章数据
module.exports.deletearticle = (req, res) => {

    const sql = 'update ev_articles set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章数据失败！')
        res.cc('删除文章数据成功！', 0)
    })

}


//根据 Id 获取文章详情
module.exports.getidarticle = (req, res) => {
    const sql = 'select * from ev_articles where id=?'
    db.query(sql, req.params.id, (err, results) => {

        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章详情失败！')
        res.send({
            status: 0,
            message: '获取文章详情成功！',
            data: results
        })
    })
}



//根据 Id 更新文章信息
module.exports.updatearticle = (req, res) => {
    const sql = 'update ev_articles set ? where id=?'
    db.query(sql, [req.body, req.body.Id], (err, results) => {
        console.log(req.body);
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新文章信息失败！')
        res.cc('更新文章信息成功！', 0)
    })
}

