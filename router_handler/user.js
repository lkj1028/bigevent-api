const db = require('../db/index')

exports.reguser = (req, res) => {

    const userinfo = req.body
    //判断用户名或密码是否为空
    if (!userinfo.username || !userinfo.password) {
        return res.send({
            status: 1,
            message: '用户名或密码为空'
        })
    }

    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, (err, data) => {
        if (err) return res.send({
            status: 1,
            message: err.message
        })

        if (data.length > 0) return res.send({
            status: 1,
            message: '用户名已被占用,请更换用户名'
        })

    })
    res.send('Reguser OK')
}

exports.login = (req, res) => {
    res.send('Login OK')
}