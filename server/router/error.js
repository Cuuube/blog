module.exports = new (require('../controller.js'))({
    url: '/error'
})
.bind((router) => {
    router.get('/404', (req, res) => {
        res.send('404 not found');
    })

    router.get('/500', (req, res) => {
        res.send('500 server error');
    })
})