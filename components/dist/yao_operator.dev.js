"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// 以下的所有函数用于查询 删除 修改 新增单条 数据 用于接口调用
var MysqlConnection = require('../utils/mysql-connect'); // const fs = require('fs/promises')
// 查询所有数据库数据
// 操作实体类


var MySQLOperation =
/*#__PURE__*/
function (_MysqlConnection) {
  _inherits(MySQLOperation, _MysqlConnection);

  function MySQLOperation() {
    var _this;

    _classCallCheck(this, MySQLOperation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MySQLOperation).call(this, {
      host: '127.0.0.1',
      user: 'root',
      password: '123456',
      port: 3306,
      database: 'shanhai_zhiyao'
    }, 'yao_detail'));

    _this.connect(); // ping mysql to keep connect per hour


    setInterval(function () {
      _this.connection.ping();
    }, 1000 * 60 * 60);
    return _this;
  }

  _createClass(MySQLOperation, [{
    key: "getDataByPage",
    value: function getDataByPage() {
      var page,
          count,
          SQL,
          res,
          _args = arguments;
      return regeneratorRuntime.async(function getDataByPage$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              page = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
              count = _args.length > 1 && _args[1] !== undefined ? _args[1] : 2;
              SQL = "SELECT * FROM yao_detail LIMIT ".concat(count, " OFFSET ").concat(page * count);
              _context.next = 5;
              return regeneratorRuntime.awrap(this.selectDataBySQL(SQL));

            case 5:
              res = _context.sent;
              return _context.abrupt("return", res);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return MySQLOperation;
}(MysqlConnection); // async function main() {
//     let Driver = new MySQLOperation();
//     let res = await Driver.selectDataBySQL("SELECT * FROM yao_detail WHERE title like '%夏后启%'");
//     console.log(res)
// }
// main();


module.exports = MySQLOperation;