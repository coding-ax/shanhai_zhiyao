// 写入爬取到的数据
const { insertAllData } = require('./white2mysql')
const { getDataByCount } = require('../components/get-news')
// 这个函数仅管理员调用 用来插入
async function main() {
    // 爬取数据
    let data = await getDataByCount(1, 10)
    // 数据铺平
    data = data.map(item => {
        return {
            ...item,
            imgSrc: item.imgSrc.join(','),
            tag: item.tag.join(',')
        }
    })
    // 插入数据库
    await insertAllData(data);
}
main()