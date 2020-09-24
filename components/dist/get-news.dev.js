"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// 爬取所需要的数据
// 导入所需要的包
var request = require('request');

var cheerio = require('cheerio');

var headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36 Edg/85.0.564.51'
};
/**
 * getPage函数：爬取指定url信息并作为promise返回相关函数
 *
 * @param {string} url
 * @return {promise} 
 */

function getPage(url) {
  return new Promise(function (resolve, reject) {
    request.get(url, {
      headers: headers
    }, function (error, response, body) {
      if (error) {
        console.log(error);
        reject(error);
      }

      resolve(response);
    });
  });
}
/**
 *
 * 用来解析主页 从而获取相关的详情页url 并将其作为json返回
 * @param {object}} { body }
 * @return {array<object>} 
 */


function parseHomePage(_ref) {
  var body = _ref.body;
  // 进行cheerio解析
  var $ = cheerio.load(body);
  var data = [];
  $("article h2 a").each(function (idx, element) {
    var title = $(element).text().trim().replace(/[\t,\n]/g, '');

    if (title.indexOf("公告") == -1) {
      var href = $(element).attr('href');
      data.push({
        title: title,
        href: href
      });
    }
  });
  return data;
}
/**
 *
 * 解析详情页面 并返回相关数据
 * @param {object} { href, title }
 * @return {src} 
 */


function parseDetailPage(_ref2) {
  var href, title, response, $, detail, rawHTML, imgSrc, tag;
  return regeneratorRuntime.async(function parseDetailPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          href = _ref2.href, title = _ref2.title;
          _context.next = 3;
          return regeneratorRuntime.awrap(getPage(href));

        case 3:
          response = _context.sent;
          // 解决实体编码问题
          $ = cheerio.load(response.body, {
            decodeEntities: false
          }); // 去掉点赞

          $('.entry div').remove(); // 解析相关数据

          detail = $('.entry').text();
          rawHTML = $('.entry').html();
          imgSrc = [];
          $('.entry img').each(function (idx, element) {
            var src = $(element).attr('src');
            imgSrc.push(src);
          });
          tag = [];
          $('.post-tags a').each(function (idx, element) {
            tag.push($(element).text());
          });
          return _context.abrupt("return", {
            title: title,
            detail: detail,
            rawHTML: rawHTML,
            imgSrc: imgSrc,
            tag: tag
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getDataByCount() {
  var countStart,
      countEnd,
      detail,
      allData,
      i,
      response,
      data,
      _i,
      _allData,
      res,
      pageDetail,
      _args2 = arguments;

  return regeneratorRuntime.async(function getDataByCount$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          countStart = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 1;
          countEnd = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 1;
          detail = [];
          allData = [];
          i = countStart;

        case 5:
          if (!(i <= countEnd)) {
            _context2.next = 14;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(getPage("https://www.cbaigui.com/page/".concat(i)));

        case 8:
          response = _context2.sent;
          data = parseHomePage(response); // 写入allData

          allData.push.apply(allData, _toConsumableArray(data));

        case 11:
          i++;
          _context2.next = 5;
          break;

        case 14:
          _i = 0, _allData = allData;

        case 15:
          if (!(_i < _allData.length)) {
            _context2.next = 24;
            break;
          }

          res = _allData[_i];
          _context2.next = 19;
          return regeneratorRuntime.awrap(parseDetailPage(res));

        case 19:
          pageDetail = _context2.sent;
          detail.push(pageDetail);

        case 21:
          _i++;
          _context2.next = 15;
          break;

        case 24:
          return _context2.abrupt("return", detail);

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  getDataByCount: getDataByCount
};