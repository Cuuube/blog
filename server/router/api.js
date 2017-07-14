module.exports = new (require('../controller.js'))('/api')
.bind((router) => {
    const ac = require('../db/article.js');
    router.get('/article', (req, res) => {
        const query = req.query;
        ac.find(query).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.redirect('/error/500');
        })
        
    })

    router.get('/sth', (req, res) => {
        res.send('sth');
    })

    router.post('/article', (req, res) => {
        // 上传新文章, 需要权限控制
        const data = req.body;
        if (true) {
            ac.add(data).then(() => {
                res.send({code: 1, msg: '文章成功提交!'});
            }).catch((err) => {
                res.send({code: 0, msg: '出了些情况，提交失败!'});
            });
        } else {
            res.send({code: 0, msg: '您没权限提交文章!'});
        }
    })

    router.delete('/article', (req, res) => {
        // 上传新文章, 需要权限控制
        const data = req.body;
        if (true) {
            ac.remove(data).then(() => {
                res.send({code: 1, msg: '文章成功删除!'});
            }).catch((err) => {
                res.send({code: 0, msg: '出了些情况，删除失败!'});
            });
        } else {
            res.send({code: 0, msg: '您没权限删除文章!'});
        }
    })

    router.post('/file', (req, res) => {
        // 上传文件
    })

    // router.get('/:article_name', (req, res) => {
    //     let article_name = req.params.article_name;
    //     res.send(article_name);
    // })
})