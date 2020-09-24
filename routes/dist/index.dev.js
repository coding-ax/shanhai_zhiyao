"use strict";

var router = require('koa-router')();

router.get('/', function _callee(ctx, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ctx.render('index', {
            title: 'Hello Koa 2!'
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}); // router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })
// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router;