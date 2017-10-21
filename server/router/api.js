const manageKey = require('../config.js').manageKey;
module.exports = new (require('../controller.js'))({
    url: '/api',
    dependencies: {
        ac: require('../db/articleDbController.js'),
        lc: require('../db/loginDbController.js'),
        lock: require('../utils/simpleLock'),
        pw: require('process').env['PW']
    }
})
.bind((router, dependencies) => {
    router.get('/article', (req, res) => {
        const ac = dependencies['ac'];
        const query = req.query;
        ac.find(query).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.redirect('/error/500');
        })
    })

    router.post('/article', (req, res) => {
        // 上传新文章, 需要权限控制
        const ac = dependencies['ac'];
        const data = req.body;
        if (!data.file_name) {
            res.status(200).send({code: 0, msg: '文章格式错误，提交失败!'});
            return false;
        }
        if (req.cookies.isManage === manageKey) {
            ac.find({file_name: data.file_name}).then((res_data) => {
                if (res_data.length !== 0) {
                    return new Promise(() => {
                        let err = new Error();
                        err.code = 2;
                        throw(err);
                    });
                } else {
                    return ac.add(data);
                }
            }).then((err) => {
                res.send({code: 1, msg: '文章成功提交!'});
            }).catch((err) => {
                switch (err.code) {
                    case 2: 
                        res.status(200).send({code: 0, msg: '文件名已存在，请更换文件名。'});
                        break;
                    default:
                        res.status(200).send({code: 0, msg: '出了些情况，提交失败!'});
                }
            });
        } else {
            res.send({code: 0, msg: '您没权限提交文章!'});
        }
    })

    router.delete('/article', (req, res) => {
        // 上传新文章, 需要权限控制
        const ac = dependencies['ac'];        
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
        res.send({msg: 'not open', code: 0});
    })

    router.post('/login', (req, res) => {
        const lc = dependencies['lc'];
        const lock = dependencies['lock'];
        /**
         * 登陆检测
         * 如果密码相同，发送已登陆的cookie
         * 如果不相同，返回msg
         */
        // const pagePath = path.join('../templates', 'article', 'login.html');
        let body = req.body;
        let data = body.join('');  //要是个字符串，然后服务器解码查询该字符串
        //解码
        let _data = lock.lock(data);
        //数据库查询，有的话返回身份cookie，没有的话返回认证失败json  // 密码不放到数据库里了，放到环境变量里
        // lc.find({password: _data})
        // .then(resp => {
        //     // success
        //     res.cookie('isManage', 1, {maxAge: 60 * 1000});
        // }).catch(e => {
        //     res.send(JSON.stringify({
        //         code: 0,
        //         msg: 'not exist.'
        //     }))
        // });
        if (_data === dependencies['pw']) {
            res.send({code: 1});
        } else {
            res.send({code: 0});
        }
        // res.cookie('isManage', 1, {maxAge: 60 * 1000});
    })
    
    router.get('/test', (req, res) => {
        let result = `You are requesting "${req.baseUrl}", the full-url is "${req.originalUrl}".
Accroding parsed, json of require object is ${JSON.stringify(req.query) } .`
        res.send(result);
    })

    router.post('/test', (req, res) => {
        let result = `You are requesting "${req.baseUrl}", the full-url is "${req.originalUrl}".
Accroding parsed, json of require object is ${JSON.stringify(req.body) } .`
        res.send(result);
    })

    router.get('/jsonptest', (req, res) => {
        let cbName = req.query.callback;
        let str = '{a:"b",b:"c"}';
        let resStr = `${cbName}(${str})`;
        res.send(resStr);
    })
})