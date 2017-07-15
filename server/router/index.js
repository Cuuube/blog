module.exports = new (require('../controller.js'))({
    url: '/'
})
.bind((router, dependencies) => {
    router.get('/', (req, res) => {
        res.redirect(302,'/article');
    })
})