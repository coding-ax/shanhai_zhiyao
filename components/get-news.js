// 爬取所需要的数据
// 导入所需要的包
const request = require('request')
const cheerio = require('cheerio')
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36 Edg/85.0.564.51'
}
/**
 * getPage函数：爬取指定url信息并作为promise返回相关函数
 *
 * @param {string} url
 * @return {promise} 
 */
function getPage(url) {
    return new Promise((resolve, reject) => {
        request.get(url, {
            headers
        }, (error, response, body) => {
            if (error) {
                console.log(error);
                reject(error)
            }
            resolve(response);
        })
    })
}
/**
 *
 * 用来解析主页 从而获取相关的详情页url 并将其作为json返回
 * @param {object}} { body }
 * @return {array<object>} 
 */
function parseHomePage({ body }) {
    // 进行cheerio解析
    let $ = cheerio.load(body);
    let data = [];
    $("article h2 a").each((idx, element) => {
        let title = $(element).text().trim().replace(/[\t,\n]/g, '');
        if (title.indexOf("公告") == -1) {
            let href = $(element).attr('href')
            data.push(
                {
                    title,
                    href
                }
            )
        }
    })
    return data;
}
/**
 *
 * 解析详情页面 并返回相关数据
 * @param {object} { href, title }
 * @return {src} 
 */
async function parseDetailPage({ href, title }) {
    let response = await getPage(href);
    // 解决实体编码问题
    let $ = cheerio.load(response.body, { decodeEntities: false });
    // 去掉点赞
    $('.entry div').remove();
    // 解析相关数据
    let detail = $('.entry').text();
    let rawHTML = $('.entry').html();
    let imgSrc = [];
    $('.entry img').each((idx, element) => {
        let src = $(element).attr('src')
        imgSrc.push(src)
    })
    let tag = [];
    $('.post-tags a').each((idx, element) => {
        tag.push($(element).text());
    })
    return {
        title,
        detail,
        rawHTML,
        imgSrc,
        tag
    }
}

async function getDataByCount(countStart = 1, countEnd = 1) {
    let detail = [];
    let allData = [];
    for (let i = countStart; i <= countEnd; i++) {
        let response = await getPage(`https://www.cbaigui.com/page/${i}`);
        let data = parseHomePage(response);
        // 写入allData
        allData.push(...data);
    }
    // 解析
    for (let res of allData) {
        let pageDetail = await parseDetailPage(res);
        detail.push(pageDetail)
    }
    return detail;
}
module.exports = {
    getDataByCount
}
