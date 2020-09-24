const mysql = require('mysql');
const escape = mysql.escape;
const escapeId = mysql.escapeId
class MysqlConnection {
    // 使用option进行初始化和表名称
    constructor(options, table) {
        this.options = options;
        this.table = table
        this.connection = mysql.createConnection(options);
    }
    // 修改表名
    changeTable(table) {
        this.table = table;
    }
    // 连接
    connect() {
        // 连接数据库
        this.connection.connect();
    }
    // 关闭连接
    end() {
        this.connection.end();
    }
    // 查函数 用于查所有数据
    // 由于查询需要根据业务定制 所以不提供调用 需要直接根据业务进行SQL语句的编写
    async selectAllData() {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ${this.table}`, (error, result) => {
                if (error) {
                    console.log(error);
                    this.connection.rollback();
                    reject(error);
                }
                resolve(result);
            });
        })

    }
    async selectDataBySQL(selectSQL) {
        return new Promise((resolve, reject) => {
            this.connection.query(selectSQL, (error, result) => {
                if (error) {
                    console.log(error);
                    this.connection.rollback();
                    reject(error);
                }
                resolve(result);
            });
        })
    }
    // 操作操作 调用示例 obj.InsertData({ username: 'xgp' })
    async InsertData(newData) {
        const { InsertSQL, value } = this.createInsertSQL(newData);
        return new Promise((resolve, reject) => {
            console.log(InsertSQL)
            this.connection.query(InsertSQL, value, (error, result) => {
                if (error) {
                    console.log(error)
                    this.connection.rollback();
                    reject(error);
                }
                // console.log(result);
                resolve(result);
            })
        })
    }
    // 更新数据 调用示例 obj.updateData({ id: 22, username: 'ax', age: '20' }, { username: 'xgp' })
    async updateData(where, newData) {
        const { updateSQL, value } = this.createUpdateSQL(where, newData)
        return new Promise((resolve, reject) => {
            console.log(updateSQL, value);
            this.connection.query(updateSQL, value, (error, result) => {
                if (error) {
                    console.log(error)
                    this.connection.rollback();
                    reject(error);
                }
                resolve(result);
            })
        })

    }
    // 删除操作 调用示例 obj.deleteData({ username: 'xgp' })
    async deleteData(where) {
        const { deleteSQL, value } = this.createDeleteSQL(where);
        return new Promise((resolve, reject) => {
            console.log(deleteSQL);
            this.connection.query(deleteSQL, value, (error, result) => {
                if (error) {
                    console.log(error)
                    this.connection.rollback();
                    reject(error);
                }
                resolve(result);
            })
        })

    }

    // 创建updateSQL语句
    createUpdateSQL(where, newData) {
        // 读取相关数据进行
        let setSQL = ''
        let whereSQL = ''
        let value = []
        for (const key in newData) {
            setSQL += `${escapeId(key)}=?, `
            value.push(newData[key])
        }
        for (const key in where) {
            whereSQL += `${escapeId(key)}=? AND `
            value.push(where[key]);
        }
        setSQL = setSQL.substring(0, setSQL.length - 2);
        whereSQL = whereSQL.substring(0, whereSQL.length - 4);
        let updateSQL = `UPDATE ${escapeId(this.table)} SET ${setSQL} WHERE ${whereSQL}`
        return {
            updateSQL,
            value
        }
    }
    // 创建删除语句
    createDeleteSQL(where) {
        // 读取相关数据进行
        let whereSQL = ''
        let value = []
        for (const key in where) {
            whereSQL += `${escapeId(key)}=? AND `
            value.push(where[key]);
        }
        whereSQL = whereSQL.substring(0, whereSQL.length - 4);
        let deleteSQL = `DELETE FROM ${escapeId(this.table)} WHERE ${(whereSQL)}`
        return {
            deleteSQL,
            value
        }
    }
    // 创建增加语句
    createInsertSQL(newData) {
        // 读取相关数据进行
        let addSQL = ''
        let values = ''
        let value = []
        for (const key in newData) {
            addSQL += `${escapeId(key)}, `
            values += '?, '
            // 必要的防止sql注入
            value.push(newData[key]);
        }
        values = values.substring(0, values.length - 2);
        addSQL = addSQL.substring(0, addSQL.length - 2);
        let InsertSQL = `INSERT INTO ${escapeId(this.table) || 'test'} (${addSQL}) VALUES (${(values)})`
        return {
            InsertSQL,
            value
        }
    }
}
// let sql = MysqlConnection.createUpdateSQL({ id: 22, username: 'ax', age: '20' }, { username: 'xgp' })
// console.log(sql);
// sql = MysqlConnection.createDeleteSQL({ id: 22, username: 'ax', age: '20' })
// console.log(sql);
// let sql = MysqlConnection.createInsertSQL({ user: 'ax', age: 20 })
// console.log(sql);
module.exports = MysqlConnection