# 山海知妖网站后端-基于koa2
## 一、《山海知妖管理系统功能》需求清单

 - [√]  爬取妖怪数据
 - [√]  解析妖怪数据
 - [ ]  自动爬取新的妖怪数据（数据更新-同步）
 - [√]  封装数据库操作
 - [√]  建妖怪数据表
 - [√]  将妖怪数据写入数据库
 - [√]  编写查询 修改 增加 删除数据的接口
 - [√]  登录功能（基于JWT）
 - [√]  进行JWT鉴权 
 - [√]  建立用户登录数据表 
 - [√]  提供用户查询妖怪 按照tag搜索妖怪功能 
 - [√]  提供用户上传妖怪数据（追加到数据库）
 - [ ]  提供用户收藏妖怪的接口

## 二、文件目录结构及说明
```
├─bin  存放启动文件
├─components  存放相关封装相关操作的组件
│  └─dist
├─node_modules  
├─public   静态目录
│  ├─images
│  ├─javascripts
│  └─stylesheets
├─routes   路由
│  └─dist
├─SQL-CRUD-ADMIN  存放直接执行的文件，一般用于批量处理数据库
├─SQLdata  数据库.sql文件
├─static  静态目录
├─utils   工具类封装目录
│  └─dist
└─views    koa-views工具
```
## 三、启动

* clone本项目并cd到本目录 并且在控制台输入：

` ` ` npm start ` ` `

* 默认启动地址与端口：http://127.0.0.1:3000  

* 如果需要修改端口 请自行修改/bin/www中的line 16 

## 四、前端使用接口文档地址

* https://easydoc.xyz/doc/40081439/BEThrbpo/7Sfaqsag
