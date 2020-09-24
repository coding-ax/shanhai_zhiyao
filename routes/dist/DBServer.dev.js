"use strict";

// 编写进行CRUD的接口
// 导入必要元素
var yaoOperator = require('../components/yao_operator');

var router = require('koa-router')();

router.prefix('/yao_detail'); // 获取所有的数据
// 保存数据库连接

var connect = new yaoOperator();
router.get('/getAllDetail', function _callee(ctx, next) {
  var res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(connect);
          _context.next = 3;
          return regeneratorRuntime.awrap(connect.selectAllData());

        case 3:
          res = _context.sent;
          ctx.body = {
            msg: '查询成功',
            data: res,
            code: 200
          };

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}); // 根据分页获取数据 page第页  count每次多少条（默认5）

router.get('/getDetail', function _callee2(ctx, next) {
  var res, _res, _res2, _res3;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(!ctx.query.page && !ctx.query.count)) {
            _context2.next = 7;
            break;
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap(connect.getDataByPage());

        case 3:
          res = _context2.sent;
          ctx.body = {
            msg: '查询成功',
            data: res,
            code: 200
          };
          _context2.next = 25;
          break;

        case 7:
          if (!(!ctx.query.page && ctx.query.count)) {
            _context2.next = 14;
            break;
          }

          _context2.next = 10;
          return regeneratorRuntime.awrap(connect.getDataByPage(0, ctx.query.count));

        case 10:
          _res = _context2.sent;
          ctx.body = {
            msg: '查询成功',
            data: _res,
            code: 200
          };
          _context2.next = 25;
          break;

        case 14:
          if (!(ctx.query.page && !ctx.query.count)) {
            _context2.next = 21;
            break;
          }

          _context2.next = 17;
          return regeneratorRuntime.awrap(connect.getDataByPage(ctx.query.page));

        case 17:
          _res2 = _context2.sent;
          ctx.body = {
            msg: '查询成功',
            data: _res2,
            code: 200
          };
          _context2.next = 25;
          break;

        case 21:
          _context2.next = 23;
          return regeneratorRuntime.awrap(connect.getDataByPage(ctx.query.page, ctx.query.count));

        case 23:
          _res3 = _context2.sent;
          ctx.body = {
            msg: '查询成功',
            data: _res3,
            code: 200
          };

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // 进行条件搜索查询

router.get('/getDetailByKeyWord', function _callee3(ctx, next) {
  var SQL, res;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (ctx.query.key) {
            _context3.next = 4;
            break;
          }

          ctx.body = {
            code: 400,
            msg: '参数有误'
          };
          _context3.next = 9;
          break;

        case 4:
          SQL = "SELECT * FROM yao_detail WHERE title like '%".concat(ctx.query.key, "%' OR detail like '%").concat(ctx.query.key, "%' OR tag like '").concat(ctx.query.key, "'"); // ctx.body = await connect.selectDataBySQL(SQL);

          _context3.next = 7;
          return regeneratorRuntime.awrap(connect.selectDataBySQL(SQL));

        case 7:
          res = _context3.sent;
          ctx.body = {
            msg: '查询成功',
            data: res,
            code: 200
          };

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // 删除数据 通过post进行连接

router.post('/delDataByID', function _callee4(ctx, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (ctx.query.id) {
            _context4.next = 4;
            break;
          }

          ctx.body = {
            msg: '参数有误',
            code: 400
          };
          _context4.next = 7;
          break;

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(connect.deleteData({
            id: ctx.query.id
          }));

        case 6:
          ctx.body = {
            msg: '删除成功',
            code: 200
          };

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // 插入数据

router.post('/insertData', function _callee5(ctx, next) {
  var res;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (ctx.query.title) {
            _context5.next = 4;
            break;
          }

          ctx.body = {
            msg: '参数有误',
            code: 400
          };
          _context5.next = 8;
          break;

        case 4:
          _context5.next = 6;
          return regeneratorRuntime.awrap(connect.InsertData(ctx.query));

        case 6:
          res = _context5.sent;
          ctx.body = {
            msg: '增加成功',
            code: 200,
            res: res
          };

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // 更新数据id定位即可 新数据就直接拿除了外的数据

router.post('/updateData', function _callee6(ctx, next) {
  var res;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (ctx.query.id) {
            _context6.next = 4;
            break;
          }

          ctx.body = {
            msg: '参数有误',
            code: 400
          };
          _context6.next = 8;
          break;

        case 4:
          _context6.next = 6;
          return regeneratorRuntime.awrap(connect.updateData({
            id: ctx.query.id
          }, ctx.query));

        case 6:
          res = _context6.sent;
          ctx.body = {
            msg: '修改成功',
            code: 200,
            res: res
          };

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  });
});
module.exports = router;