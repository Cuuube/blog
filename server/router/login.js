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
        bird: new (require('../utils/bird.js'))(require('../config.js').origin),
    }
})
.bind((router, dependencies) => {
    router.get('/', (req, res) => {
        const path = dependencies['path'];
        const bird = dependencies['bird'];
        const pagePath = path.join('../templates', 'article', 'login.html');
        
        res.render(pagePath);
    })
    

})