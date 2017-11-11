# blog介绍

### 1. 前奏
* 需要安装mongodb，并且在27017端口启动
* 需要安装nodejs和npm

### 2. 运行
```bash
# 需要运行mongodb
$ npm install
# 第一次使用时，执行
$ chmod -x run.sh
# 若提示permission denied， 前面加sudo
# 还需要在根目录创建文件：config.sh
# export两个值：PW和MANAGE_KEY。文件范例如文尾
$ ./run.sh
```
打开[http://localhost:8888/](http://localhost:8888/)

### 3. 其他：目录简介介绍
* `client`
* 前端源码

* `server`
* nodejs服务器源码

* `views`
* pug模板

* `public`
* 前端静态资源文件夹，images,icon和lib等

* `static`
* 前端源码编译出来的css和js等

* `build`
* typescript编译出来的server代码

* `types`
* typescript需要使用的类型拓展

* `doc`
* 乱七八糟的笔记

* `test`
* 没什么用的东西

### 4. 若要更改端口号，dbpath等，请更改server/config.ts文件


### 5. config.sh范例
请将下列代码复制，写入创建的新文件为config.sh，放根目录下。
```bash
#!/bin/bash

# login passwd
export PW='2ksAk%9'
export MANAGE_KEY='500'
export NODE_ENV='DEV'
```