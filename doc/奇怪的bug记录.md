* ## mongoose提示bug
`npm install mongoose --save`装了mongoose之后，每次启动数据库都会提示错误：
```
(node:1187) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
```
搜了一下，发现这个是新版本的问题。新版本的bug没修复，想要去掉该bug，最简单的办法是装更早版本的mongoose：
```bash
npm uninstall mongoose
npm install mongoose@4.10.8 --save
```
就不会提示了