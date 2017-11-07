const { cookiesKeepTime, manageKey, origin } = require('../config.js');
const path = require('path');
const Bird = require('../utils/bird.js');
const bird = new Bird(origin);

module.exports = [
    class {
        constructor () {
            this.type = 'get';
            this.url = '/login';
        }
        execute (req, res) {
            const pagePath = path.join('../templates', 'article', 'login.html');
            if (req.cookies.isManage === manageKey) {
                res.redirect('/article');
            } else {
                res.render(pagePath);            
            }
        }
    },

    class {
        constructor () {
            this.type = 'post';
            this.url = '/login';
        }
        execute (req, res) {
            const pagePath = path.join('../templates', 'article', 'login.html');
            bird.post('/api/v1/login', req.body).then(resp => {
                // 传递cookie
                if (resp.data.code === 1) {
                    res
                    .cookie('isManage', manageKey, {maxAge: cookiesKeepTime})
                    .send({code: 1, msg: '登录成功'});
                } else {
                    res.send({code: 0, msg: '登录失败'});
                }
            })
        }
    }

]
