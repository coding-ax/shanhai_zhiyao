// 将爬取到的数据写入mysql数据库
const MysqlConnection = require('../utils/mysql-connect');
// 这个函数仅管理员调用
const MysqlConfig = require('../MySQLConfig.json');
async function insertAllData(data) {
    let mysqlDriver = new MysqlConnection(MysqlConfig, 'yao_detail')
    mysqlDriver.connect();
    let current = await mysqlDriver.selectAllData();
    console.log(current)
    for (let res of data) {
        await mysqlDriver.InsertData(res)
    }
    mysqlDriver.end();
}
module.exports = {
    insertAllData
}