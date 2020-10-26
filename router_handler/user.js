const db = require('../db/index')

const bcryptjs = require('bcryptjs')

//导入生成token的包
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.reguser = (req, res) => {

    const userinfo = req.body
    //判断用户名或密码是否为空
    /* if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或密码为空')
    } */

    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, (err, data) => {
        if (err) return res.cc(err)

        if (data.length > 0) return res.cc('用户名已被占用,请更换用户名')

        //调用bcryptjs.hashSync(),对密码加密
        userinfo.password = bcryptjs.hashSync(userinfo.password, 10)

        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
            res.cc('注册成功', 0)
        })
    })



}

exports.login = (req, res) => {
    //接收表单数据
    const userinfo = req.body
    //定义SQL语句
    const sql = 'select * from ev_users where username= ?'

    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败！')

        //对比数据库中的密码
        const compareResult = bcryptjs.compareSync(userinfo.password, results[0].password)
        if (!compareResult) return res.cc('登录失败！')


        const user = { ...results[0], password: '', user_pic: '' }
        console.log(user);

        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn
        })


        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr,
        })

    })
}