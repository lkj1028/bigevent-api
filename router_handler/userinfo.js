const db = require('../db/index')

const bcrypt = require('bcryptjs')

//获取用户信息
module.exports.getUserInfo = (req, res) => {
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id = ?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            data: results[0],
            status: 0,
            message: '获取用户信息成功'
        })
    })
}


//更新用户的信息
module.exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新用户信息失败！')
        res.cc('更新用户信息成功', 0)
    })

}

//更新密码
module.exports.updatePassword = (req, res) => {
    const sql = 'select * from ev_users where id= ?'
    //查询是否存在该用户
    db.query(sql, req.user.id, (err, data) => {
        if (err) return res.cc(err)
        if (data.length !== 1) return res.cc('用户不存在！')
        //用户存在,判断旧密码是否输入正确
        const flag = bcrypt.compareSync(req.body.oldPwd, data[0].password)
        if (!flag) return res.cc('旧密码错误！')
        //加密新密码
        req.body.newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        //更新数据库中的密码
        const sql = 'update ev_users set password=? where id= ?'
        db.query(sql, [req.body.newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('密码更新失败！')
            res.cc('密码更新成功！', 0)
        })
    })
}

//更新头像
module.exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('头像更新失败！')
        res.cc('更新头像成功', 0)
    })
}
