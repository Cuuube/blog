module.exports = new (require('../controller.js'))('/api')
.bind((router) => {
    router.get('/article', (req, res) => {
        res.send('article');
    })

    router.get('/sth', (req, res) => {
        res.send('sth');
    })

    router.post('/article', data, (req, res) => {
        // 上传新文章
    })

    router.post('/file', data, (req, res) => {
        // 上传文件
    })

    // router.get('/:article_name', (req, res) => {
    //     let article_name = req.params.article_name;
    //     res.send(article_name);
    // })
})