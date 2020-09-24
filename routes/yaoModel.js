// 编写进行CRUD的接口
// 导入必要元素
const yaoOperator = require('../components/yao_operator')
const router = require('koa-router')()
const { escape } = require('mysql')
router.prefix('/yao_detail')
// 获取所有的数据
// 保存数据库连接
let connect = new yaoOperator();
router.get('/getAllDetail', async (ctx, next) => {
    console.log(connect);
    let res = await connect.selectAllData();
    ctx.body = {
        msg: '查询成功',
        data: res,
        code: 200
    }
})
// 根据分页获取数据 page第页  count每次多少条（默认5）
router.get('/getDetail', async (ctx, next) => {
    if (!ctx.query.page && !ctx.query.count) {
        let res = await connect.getDataByPage();
        ctx.body = {
            msg: '查询成功',
            data: res,
            code: 200
        }
    } else if (!ctx.query.page && ctx.query.count) {
        let res = await connect.getDataByPage(0, ctx.query.count)
        ctx.body = {
            msg: '查询成功',
            data: res,
            code: 200
        }
    } else if (ctx.query.page && !ctx.query.count) {
        let res = await connect.getDataByPage(ctx.query.page)
        ctx.body = {
            msg: '查询成功',
            data: res,
            code: 200
        }
    } else {
        let res = await connect.getDataByPage(ctx.query.page, ctx.query.count)
        ctx.body = {
            msg: '查询成功',
            data: res,
            code: 200
        }
    }
})
// 进行条件搜索查询
router.get('/getDetailByKeyWord', async (ctx, next) => {
    if (!ctx.query.key) {
        ctx.body = {
            code: 400,
            msg: '参数有误'
        }
    } else {
        let SQL = `SELECT * FROM yao_detail WHERE title like ${escape('%' + ctx.query.key + '%')} OR detail like ${escape('%' + ctx.query.key + '%')} OR tag like ${escape('%' + ctx.query.key + '%')}`
        // ctx.body = await connect.selectDataBySQL(SQL);
        let res = await connect.selectDataBySQL(SQL);
        ctx.body = {
            msg: '查询成功',
            data: res,
            code: 200
        }
    }
})

// 删除数据 通过post进行连接
router.post('/delDataByID', async (ctx, next) => {
    if (!ctx.query.id) {
        ctx.body = {
            msg: '参数有误',
            code: 400
        }
    } else {
        await connect.deleteData({ id: Number(ctx.query.id) })
        ctx.body = {
            msg: '删除成功',
            code: 200
        }
    }

})
// 插入数据
router.post('/insertData', async (ctx, next) => {
    if (!ctx.query.title) {
        ctx.body = {
            msg: '参数有误',
            code: 400
        }
    } else {
        console.log(ctx.query);
        let res = await connect.InsertData(ctx.query)
        ctx.body = {
            msg: '增加成功',
            code: 200,
            res
        }
    }
})
// 更新数据id定位即可 新数据就直接拿除了外的数据
router.post('/updateData', async (ctx, next) => {
    if (!ctx.query.id) {
        ctx.body = {
            msg: '参数有误',
            code: 400
        }
    } else {
        ctx.query.id = Number(ctx.query.id)
        let res = await connect.updateData({ id: ctx.query.id }, ctx.query);
        ctx.body = {
            msg: '修改成功',
            code: 200,
            res
        }
    }
})
module.exports = router