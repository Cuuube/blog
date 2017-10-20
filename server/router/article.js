const Route = require('../controller.js');
class ArticleRoute extends Route {
    constructor (config) {
        super(config);
    }
    judgeManage (req) {
        return !!req.cookies.isManage
    }
}

module.exports = new ArticleRoute ({
    url: '/article',
    dependencies: {
        md: require('../utils/markdown.js'),
        path: require('path'),
        bird: new (require('../utils/bird.js'))(require('../config.js').origin),
        fomateDate: require('../utils/fomateDate.js'),
    }
})
.bind((router, dependencies) => {
    // const self = this;
    router.get('/', (req, res) => {
        const path = dependencies['path'];
        const bird = dependencies['bird'];
        const fomateDate = dependencies['fomateDate'];        
        const pagePath = path.join('../templates', 'article', 'index.html');
        // const isManage = self.judgeManage(req);
        
        bird.get('/api/article').then((resp) => {
            if (resp.data.length === 0) {
                res.redirect('/error/404');
            } else {
                resp.data.forEach(val => {
                    val.created_time = fomateDate(val.created_time);
                })
                res.render(pagePath, {
                    articleList: resp.data,
                    isManage: !!req.cookies.isManage
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
        const bird = dependencies['bird'];        
        bird.delete('/api/article', {_id: id}).then((resp) => {
            res.send('success');
        }).catch(err => {
            res.redirect('/error/500');
        })
    })

    // 渲染页面接口
    router.get('/:article_name', (req, res) => {
        const path = dependencies['path'];
        const bird = dependencies['bird'];
        const md = dependencies['md'];
        const article_name = req.params.article_name;
        const pagePath = path.join('../templates', 'article', 'article.html');
        bird.get('/api/article', {file_name: article_name}).then((resp) => {
            if (resp.data.length === 0) {
                res.redirect('/error/404');
            } else {
                resp.data[0].content = md(resp.data[0].content);
                resp.data[0].created_time = new Date(resp.data[0].created_time).toLocaleString();
                res.render(pagePath, resp.data[0]);
            }
        }).catch(err => {
            res.redirect('/error/500');
        })
    })

})