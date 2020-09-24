// 编写进行CRUD的接口
// 导入必要元素
const UserOperator = require('../components/user_operator')
const router = require('koa-router')()
const { escape } = require('mysql')
const jwt = require('jsonwebtoken')
// 导入jwt密钥用于签发
const secret = 'ax_jwt'
// 获取所有的数据
// 保存数据库连接
let connect = new UserOperator();
router.post('/login', async (ctx, next) => {
    if (!ctx.query.username || !ctx.query.password) {
        ctx.body = {
            msg: '参数错误',
            code: 400
        }
    } else {
        const { username, password } = ctx.query;
        let ok = await connect.userMatchPassword(username, password);
        if (ok) {
            const token = jwt.sign({
                username
            }, secret, {
                expiresIn: '7d'
            })
            ctx.body = {
                msg: '登陆成功',
                token,
                code: 200
            }
        } else {
            ctx.body = {
                msg: '账号或者密码错误',
                code: 400
            }
        }

    }
})
router.post('/register', async (ctx, next) => {
    if (!ctx.query.username || !ctx.query.password) {
        ctx.body = {
            msg: '参数错误',
            code: 400
        }
    } else {
        const { username, password } = ctx.query;
        let ok = await connect.checkUser(username)
        if (ok.length==0) {
            let res = await connect.register(ctx.query);
            if (res) {
                ctx.body = {
                    msg: '注册成功',
                    code: 200
                }
            }
            else {
                ctx.body = {
                    msg: '参数错误',
                    code: 400
                }
            }
        } else {
            ctx.body = {
                msg: '账号已经存在',
                code: 200
            }
        }

    }
})
module.exports = router