const router = require('koa-router')();
const { getDataByCount } = require('../components/get-news')
// start 开始位置 end 结束页
router.get('/spider', async (ctx, next) => {
    if (!ctx.query.start) {
        ctx.body = await getDataByCount();
    } else {
        ctx.body = await getDataByCount(ctx.query.start, ctx.query.end);
    }
})
module.exports = router