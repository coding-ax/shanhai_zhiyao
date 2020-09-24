/*
Navicat MySQL Data Transfer

Source Server         : 轻量机MySQL
Source Server Version : 50718
Source Host           : 47.102.212.191:3306
Source Database       : shanhai_zhiyao

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2020-09-22 12:05:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for yao_detail
-- ----------------------------
DROP TABLE IF EXISTS `yao_detail`;
CREATE TABLE `yao_detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` text NOT NULL COMMENT '妖怪名字',
  `detail` text COMMENT '妖怪详情描述',
  `imgSrc` text COMMENT '放图片数组',
  `tag` text COMMENT '放tag',
  `rawHTML` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
