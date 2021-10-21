# 基本Ai五子棋

## 1.1 项目简介
使用原生编写的云音乐PC Web项目

项目已经完成功能如下：
1. 开始游戏
2. 悔棋
3. 重新游戏
4. 定时
5. 每个颜色的棋子下的步数
6. 游戏获胜


## 1.2. 项目规范
项目规范：项目中有一些开发规范和代码风格
- 1.文件夹、文件名称统一小写、多个单词以连接符（-）连接
- 2.JavaScript变量名称采用小驼峰标识，常量全部使用大写字母，组件采用大驼峰
- 3.css采用普通less

## 1.3 Ai下子
玩家每下一颗子，通过调用一个封装的打分函数，返回一个最大的值对应的坐标，打分函数的内部获取最大有相同的值，会随机返回一个值。

悔棋的原理通过一个栈的算法，
