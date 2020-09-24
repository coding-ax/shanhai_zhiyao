// 以下的所有函数用于查询 删除 修改 新增单条 数据 用于接口调用
const MysqlConnection = require('../utils/mysql-connect');
const { escape, escapeId } = require('mysql')
// const fs = require('fs/promises')
// 查询所有数据库数据
// 操作实体类
const MysqlConfig = require('../MySQLConfig.json');
class MySQLOperation extends MysqlConnection {
    constructor() {
        super(MysqlConfig, 'yao_detail');
        this.connect();
        // ping mysql to keep connect per hour
        setInterval(() => {
            this.connection.ping();
        }, 1000 * 60 * 60);
    }
    async getDataByPage(page = 0, count = 20) {
        page = Number(page);
        count = Number(count);
        let SQL = `SELECT * FROM yao_detail LIMIT ${escape(count)} OFFSET ${escape(page * count)}`;
        console.log(SQL)
        let res = await this.selectDataBySQL(SQL);
        return res;
    }
}
// async function main() {
//     let Driver = new MySQLOperation();
//     let res = await Driver.selectDataBySQL("SELECT * FROM yao_detail WHERE title like '%夏后启%'");
//     console.log(res)
// }
// main();

module.exports = MySQLOperation