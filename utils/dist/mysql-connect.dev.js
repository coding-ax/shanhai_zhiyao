"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mysql = require('mysql');

var _require = require('path'),
    resolve = _require.resolve;

var MysqlConnection =
/*#__PURE__*/
function () {
  // 使用option进行初始化和表名称
  function MysqlConnection(options, table) {
    _classCallCheck(this, MysqlConnection);

    this.options = options;
    this.table = table;
    this.connection = mysql.createConnection(options);
  } // 修改表名


  _createClass(MysqlConnection, [{
    key: "changeTable",
    value: function changeTable(table) {
      this.table = table;
    } // 连接

  }, {
    key: "connect",
    value: function connect() {
      // 连接数据库
      this.connection.connect();
    } // 关闭连接

  }, {
    key: "end",
    value: function end() {
      this.connection.end();
    } // 查函数 用于查所有数据
    // 由于查询需要根据业务定制 所以不提供调用 需要直接根据业务进行SQL语句的编写

  }, {
    key: "selectAllData",
    value: function selectAllData() {
      var _this = this;

      return regeneratorRuntime.async(function selectAllData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                _this.connection.query("SELECT * FROM ".concat(_this.table), function (error, result) {
                  if (error) {
                    console.log(error);

                    _this.connection.rollback();

                    reject(error);
                  }

                  resolve(result);
                });
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "selectDataBySQL",
    value: function selectDataBySQL(selectSQL) {
      var _this2 = this;

      return regeneratorRuntime.async(function selectDataBySQL$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise(function (resolve, reject) {
                _this2.connection.query(selectSQL, function (error, result) {
                  if (error) {
                    console.log(error);

                    _this2.connection.rollback();

                    reject(error);
                  }

                  resolve(result);
                });
              }));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    } // 操作操作 调用示例 obj.InsertData({ username: 'xgp' })

  }, {
    key: "InsertData",
    value: function InsertData(newData) {
      var _this3 = this;

      var _this$createInsertSQL, InsertSQL, value;

      return regeneratorRuntime.async(function InsertData$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$createInsertSQL = this.createInsertSQL(newData), InsertSQL = _this$createInsertSQL.InsertSQL, value = _this$createInsertSQL.value;
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                _this3.connection.query(InsertSQL, value, function (error, result) {
                  if (error) {
                    console.log(error);

                    _this3.connection.rollback();

                    reject(error);
                  } // console.log(result);


                  resolve(result);
                });
              }));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    } // 更新数据 调用示例 obj.updateData({ id: 22, username: 'ax', age: '20' }, { username: 'xgp' })

  }, {
    key: "updateData",
    value: function updateData(where, newData) {
      var _this4 = this;

      var _this$createUpdateSQL, updateSQL, value;

      return regeneratorRuntime.async(function updateData$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this$createUpdateSQL = this.createUpdateSQL(where, newData), updateSQL = _this$createUpdateSQL.updateSQL, value = _this$createUpdateSQL.value;
              return _context4.abrupt("return", new Promise(function (resolve, reject) {
                _this4.connection.query(updateSQL, value, function (error, result) {
                  if (error) {
                    console.log(error);

                    _this4.connection.rollback();

                    reject(error);
                  }

                  resolve(result);
                });
              }));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    } // 删除操作 调用示例 obj.deleteData({ username: 'xgp' })

  }, {
    key: "deleteData",
    value: function deleteData(where) {
      var _this5 = this;

      var _this$createDeleteSQL, deleteSQL, value;

      return regeneratorRuntime.async(function deleteData$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this$createDeleteSQL = this.createDeleteSQL(where), deleteSQL = _this$createDeleteSQL.deleteSQL, value = _this$createDeleteSQL.value;
              return _context5.abrupt("return", new Promise(function (resolve, reject) {
                _this5.connection.query(deleteSQL, value, function (error, result) {
                  if (error) {
                    console.log(error);

                    _this5.connection.rollback();

                    reject(error);
                  }

                  resolve(result);
                });
              }));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    } // 创建updateSQL语句

  }, {
    key: "createUpdateSQL",
    value: function createUpdateSQL(where, newData) {
      // 读取相关数据进行
      var setSQL = '';
      var whereSQL = '';
      var value = [];

      for (var key in newData) {
        setSQL += "".concat(key, "=?, ");
        value.push(newData[key]);
      }

      for (var _key in where) {
        whereSQL += "".concat(_key, "=? AND ");
        value.push(where[_key]);
      }

      setSQL = setSQL.substring(0, setSQL.length - 2);
      whereSQL = whereSQL.substring(0, whereSQL.length - 4);
      var updateSQL = "UPDATE ".concat(this.table, " SET ").concat(setSQL, " WHERE ").concat(whereSQL);
      return {
        updateSQL: updateSQL,
        value: value
      };
    } // 创建删除语句

  }, {
    key: "createDeleteSQL",
    value: function createDeleteSQL(where) {
      // 读取相关数据进行
      var whereSQL = '';
      var value = [];

      for (var key in where) {
        whereSQL += "".concat(key, "=? AND ");
        value.push(where[key]);
      }

      whereSQL = whereSQL.substring(0, whereSQL.length - 4);
      var deleteSQL = "DELETE FROM ".concat(this.table, " WHERE ").concat(whereSQL);
      return {
        deleteSQL: deleteSQL,
        value: value
      };
    } // 创建增加语句

  }, {
    key: "createInsertSQL",
    value: function createInsertSQL(newData) {
      // 读取相关数据进行
      var addSQL = '';
      var values = '';
      var value = [];

      for (var key in newData) {
        addSQL += "".concat(key, ", ");
        values += '?, ';
        value.push(newData[key]);
      }

      values = values.substring(0, values.length - 2);
      addSQL = addSQL.substring(0, addSQL.length - 2);
      var InsertSQL = "INSERT INTO ".concat(this.table || 'test', " (").concat(addSQL, ") VALUES (").concat(values, ")");
      return {
        InsertSQL: InsertSQL,
        value: value
      };
    }
  }]);

  return MysqlConnection;
}(); // let sql = MysqlConnection.createUpdateSQL({ id: 22, username: 'ax', age: '20' }, { username: 'xgp' })
// console.log(sql);
// sql = MysqlConnection.createDeleteSQL({ id: 22, username: 'ax', age: '20' })
// console.log(sql);
// let sql = MysqlConnection.createInsertSQL({ user: 'ax', age: 20 })
// console.log(sql);


module.exports = MysqlConnection;