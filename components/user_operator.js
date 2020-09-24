// 这个实体类用于操作user表
const MysqlConnection = require('../utils/mysql-connect');
// 防止sql注入
const { escape, escapeId } = require('mysql');
const { use } = require('../app');
// 查询所有数据库数据
// 操作实体类
const MysqlConfig = require('../MySQLConfig.json');
class MySQLOperation extends MysqlConnection {
    constructor() {
        super(MysqlConfig, 'user_info');
        this.connect();
        // ping mysql to keep connect per hour
        setInterval(() => {
            this.connection.ping();
        }, 1000 * 60 * 60);
    }
    // 查看是否有这个用户名
    async checkUser(username) {
        let sql = `SELECT * FROM user_info WHERE username=${escape(username)}`
        // console.log(sql);
        let res = await this.selectDataBySQL(sql);
        // console.log(res);
        return res;
    }
    // 查看密码是否匹配用户名
    async userMatchPassword(username, password) {
        let res = await this.checkUser(username);
        if (res.length == 1) {
            res = res[0];
        }
        console.log(res.password)
        if (password === res.password) {
            return true;
        } else {
            return false;
        }
    }
    async register(userInfo) {
        let res = await this.checkUser(userInfo.username);
        // 检测是否有这个res
        // 没有那就注册
        // console.log(res);
        if (res.length == 0) {
            await this.InsertData(userInfo);
            return true;
        } else {
            return false;
        }
    }
    async configSelfInfo(username, password, newConfig) {
        let ok = await this.userMatchPassword(username, password);
        if (ok) {
            await this.updateData({
                username,
                password
            },
                newConfig
            )
            return true;
        } else {
            return false;
        }
    }
}
async function main() {
    let Driver = new MySQLOperation();
    let res = await Driver.register({ username: 'AX', password: '123456' });
    console.log(res);
    res = await Driver.userMatchPassword('root', '123456')
    console.log(res);
    res = await Driver.userMatchPassword('AX', '123456')
    console.log(res);
    res = await Driver.userMatchPassword('ax', '123456')
    console.log(res);
    Driver.end();
}
// main();

module.exports = MySQLOperation