module.exports = new (require('../controller.js'))('/article')
.bind((router) => {
    router.get('/', (req, res) => {
        res.send('article');
    })

    router.get('/write', (req, res) => {
        res.send('write');
    })

    router.get('/:article_name', (req, res) => {
        let article_name = req.params.article_name;
        res.send(article_name);
    })
})