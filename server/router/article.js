const path = require('path');
const config = require('../config.js');
const md = require('../utils/markdown.js');
const Bird = require('../utils/bird.js');
const fomateDate = require('../utils/fomateDate.js');
const bird = new Bird(config.origin);
const manageKey = config.manageKey;

module.exports = [
    
    // 文章主页
    class {
        constructor () {
            this.url = '/article';
            this.type = 'get';
        }
        execute (req, res) {
            const pagePath = path.join('../templates', 'article', 'index.html');
            const isManage = req.cookies.isManage === manageKey;
            
            bird.get('/api/v1/article').then((resp) => {
                if (resp.data.length === 0) {
                    res.redirect('/error/404');
                } else {
                    resp.data.forEach(val => {
                        val.created_time = fomateDate(val.created_time);
                    })
                    res.render(pagePath, {
                        articleList: resp.data,
                        isManage: isManage
                    });
                }
            }).catch(err => {
                res.redirect('/error/500');
            })
        }
    },

    // 文章新建页
    class {
        constructor () {
            this.url = '/article/write';
            this.type = 'get';
        }
        execute (req, res) {
            const pagePath = path.join('../templates', 'article', 'write.html');
            if (req.cookies.isManage === manageKey) {
                res.render(pagePath);
            } else {
                res.redirect('/error/404')
            }
        }
    },

    // 文章详细页
    class {
        constructor () {
            this.url = '/article/:article_name';
            this.type = 'get';
        }
        execute (req, res) {
            const article_name = req.params.article_name;
            const pagePath = path.join('../templates', 'article', 'article.html');
            bird.get('/api/v1/article', {file_name: article_name}).then((resp) => {
                if (resp.data.length === 0) {
                    res.redirect('/error/404');
                } else {
                    // 查询结果返回一个数组，我们只需要第一个 
                    resp.data[0].content = md(resp.data[0].content);
                    resp.data[0].created_time = new Date(resp.data[0].created_time).toLocaleString();
                    res.render(pagePath, resp.data[0]);
                }
            }).catch(err => {
                res.redirect('/error/500');
            })
        }
    },


    // 不安全的请求接口，请使用 delete /api/article
    class {
        constructor () {
            this.url = '/article/delete/:id';
            this.type = 'get';
        }
        execute (req, res) {
            bird.delete('/api/v1/article', {_id: id}).then((resp) => {
                res.send('success');
            }).catch(err => {
                res.redirect('/error/500');
            })
        }
    }
]