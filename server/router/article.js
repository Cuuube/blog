module.exports = new (require('../controller.js'))({
    url: '/article',
    dependencies: {
        md: require('../utils/markdown.js'),
        path: require('path'),
        getter: new (require('../utils/getter.js'))(require('../config.js').origin),
        fomateDate: require('../utils/fomateDate.js'),
    }
})
.bind((router, dependencies) => {
    router.get('/', (req, res) => {
        const path = dependencies['path'];
        const getter = dependencies['getter'];
        const fomateDate = dependencies['fomateDate'];        
        const pagePath = path.join('../templates', 'article', 'index.html')
        getter.get('/api/article').then((resp) => {
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
        const path = dependencies['path'];        
        const pagePath = path.join('../templates', 'article', 'write.html')
        res.render(pagePath);
    })

    // 不安全的请求接口，请使用 delete /api/article
    router.get('/delete/:id', (req, res) => {
        const getter = dependencies['getter'];        
        getter.delete('/api/article', {_id: id}).then((resp) => {
            res.send('success');
        }).catch(err => {
            res.redirect('/error/500');
        })
    })

    // 渲染页面接口
    router.get('/:article_name', (req, res) => {
        const path = dependencies['path'];
        const getter = dependencies['getter'];
        const md = dependencies['md'];
        const article_name = req.params.article_name;
        const pagePath = path.join('../templates', 'article', 'article.html');
        getter.get('/api/article', {file_name: article_name}).then((resp) => {
            if (resp.data.length === 0) {
                res.redirect('/error/404');
            } else {
                resp.data[0].content = md(resp.data[0].content);
                res.render(pagePath, resp.data[0]);
            }
        }).catch(err => {
            res.redirect('/error/500');
        })
    })

})