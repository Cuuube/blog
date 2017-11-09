import process = require('process');
import { Request, Response } from 'express';

import { GET, POST, DELETE } from '../controller';
import config from '../config';
import ac from '../db/articleDbController';
import lc from '../db/loginDbController';
import lock from '../utils/simpleLock';

const manageKey = config.manageKey;
const pw = process.env.PW;



@GET('/api/v1/article')
export class GetAllArticle {
    execute (req: Request, res: Response) {
        const query = req.query;
        ac.find(query).then((data: mdl.Article[]) => {
            res.send(data);
        }).catch((err: Error) => {
            res.redirect('/error/500');
        })
    }
}


@POST('/api/v1/article')
export class AddNewArticle {
    execute (req: Request, res: Response) {
        // 上传新文章, 需要权限控制
        const data: mdl.Article = req.body;
        if (!data.file_name) {
            res.status(200).send({code: 0, msg: '文章格式错误，提交失败!'});
            return false;
        }
        if (req.cookies.isManage === manageKey) {
            ac.find({file_name: data.file_name}).then((res_data: mdl.Article[]) => {
                if (res_data.length !== 0) {
                    return new Promise(() => {
                        let err = new Error();
                        Object.defineProperty(err, 'code', {
                            value: 2
                        });
                        throw(err);
                    });
                } else {
                    return ac.add(data);
                }
            }).then((err: Error) => {
                res.send({code: 1, msg: '文章成功提交!'});
            }).catch((err: obj) => {
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
    }
}


@DELETE('/api/v1/article')
export class DeleteArticle{
    execute (req: Request, res: Response) {
        // 上传新文章, 需要权限控制
        const data = req.body;
        if (true) {
            ac.remove(data).then(() => {
                res.send({code: 1, msg: '文章成功删除!'});
            }).catch((err: Error) => {
                res.send({code: 0, msg: '出了些情况，删除失败!'});
            });
        } else {
            res.send({code: 0, msg: '您没权限删除文章!'});
        }
    }
}

@POST('/api/v1/login')
export class Login {
    execute (req: Request, res: Response) {
        /**
         * 登陆检测
         * 如果密码相同，发送已登陆的cookie
         * 如果不相同，返回msg
         */
        // const pagePath = path.join('../templates', 'article', 'login.html');
        let body: string[] = req.body;
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
        if (_data === pw) {
            res.send({ code: 1 });
        } else {
            res.send({ code: 0 });
        }
        // res.cookie('isManage', 1, {maxAge: 60 * 1000});
    }
}

@GET('/api/v1/test')
export class GetTest {
    execute (req: Request, res: Response) {
        let result = `You are requesting "${req.baseUrl}", the full-url is "${req.originalUrl}".
        Accroding parsed, json of require object is ${JSON.stringify(req.query) } .`
        res.send(result);
    }
}

@POST('/api/v1/test')
export class PostTest {
    execute (req: Request, res: Response) {
        let result = `You are requesting "${req.baseUrl}", the full-url is "${req.originalUrl}".
        Accroding parsed, json of require object is ${JSON.stringify(req.body) } .`
        res.send(result);
    }
}

@GET('/api/v1/jsonptest')
export class JsonpTest {
    execute (req: Request, res: Response) {
        let cbName: Function = req.query.callback;
        let str = '{a:"b",b:"c"}';
        let resStr = `${cbName}(${str})`;
        res.send(resStr);
    }
}
