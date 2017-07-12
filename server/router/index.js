module.exports = new (require('../controller.js'))('/')
.bind((router) => {
    router.get('/', (req, res) => {
        res.redirect(302,'/article');
    })
})