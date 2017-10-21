const Route = require('../controller.js');
const {cookiesKeepTime, manageKey} = require('../config.js');

class LoginRoute extends Route {
    constructor (config) {
        super(config);
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
        if (req.cookies.isManage === manageKey) {
            res.redirect('/article');
        } else {
            res.render(pagePath);            
        }
        
    })
    router.post('/', (req, res) => {
        const path = dependencies['path'];
        const bird = dependencies['bird'];
        const pagePath = path.join('../templates', 'article', 'login.html');
        bird.post('/api/login', req.body).then(resp => {
            // 传递cookie
            if (resp.data.code === 1) {
                res
                .cookie('isManage', manageKey, {maxAge: cookiesKeepTime})
                .send({code: 1, msg: '登录成功'});
            } else {
                res.send({code: 0, msg: '登录失败'});
            }
        })
    })
    

})