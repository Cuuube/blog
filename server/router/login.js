const Route = require('../controller.js');
class LoginRoute extends Route {
    constructor (config) {
        super(config);
    }
    judgeManage (req) {
        return !!req.cookies.isManage
    }
}

module.exports = new LoginRoute ({
    url: '/login',
    dependencies: {
        path: require('path'),
        getter: new (require('../utils/getter.js'))(require('../config.js').origin),
    }
})
.bind((router, dependencies) => {
    router.get('/', (req, res) => {
        const path = dependencies['path'];
        const getter = dependencies['getter'];
        const pagePath = path.join('../templates', 'article', 'login.html');
        
        res.render(pagePath);
    })
    

})