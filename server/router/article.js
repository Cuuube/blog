module.exports = new (require('../controller.js'))('/article')
.bind((router) => {
    const path = require('path');
    const axios = require('axios');
    const config = require('../config.js');
    const origin = config.origin;
    const fomateDate = require('../utils/fomateDate.js');

    router.get('/', (req, res) => {
        const pagePath = path.join('../templates', 'article', 'index.html')
        axios.get(origin+'/api/article').then((resp) => {
            resp.data.forEach(val => {
                val.created_time = fomateDate(val.created_time);
            })
            if (resp.data.length === 0) {
                res.redirect('/error/404');
            } else {
                res.render(pagePath, {
                    articleList: resp.data
                });
            }
        }).catch(err => {
            res.redirect('/error/500');
        })
    })

    router.get('/write', (req, res) => {
        const pagePath = path.join('../templates', 'article', 'write.html')
        res.render(pagePath);
    })

    // 不安全的请求接口，请使用 delete /api/article
    router.get('/delete/:id', (req, res) => {
        axios.delete(origin + '/api/article', {_id: id}).then((resp) => {
            res.send('success');
        }).catch(err => {
            res.redirect('/error/500');
        })
    })

    // 渲染页面接口
    router.get('/:article_name', (req, res) => {
        const article_name = req.params.article_name;
        const pagePath = path.join('../templates', 'article', 'article.html');
        axios.get(origin+'/api/article?file_name=' + article_name).then((resp) => {
            if (resp.data.length === 0) {
                res.redirect('/error/404');
            } else {
                res.render(pagePath, resp.data[0]);
            }
        }).catch(err => {
            res.redirect('/error/500');
        })
    })

})