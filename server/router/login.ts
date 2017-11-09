import * as path from 'path';
import { Request, Response } from 'express';
import { GET, POST } from '../controller';
import { Bird } from '../utils/bird';
import config from '../config';

const bird = new Bird(config.origin);
const { cookiesKeepTime, manageKey, origin } = require('../config.js');


@GET('/login')
export class LoginPageRoute{
    execute (req: Request, res: Response) {
        const pagePath = path.join('../templates', 'article', 'login.html');
        if (req.cookies.isManage === manageKey) {
            res.redirect('/article');
        } else {
            res.render(pagePath);            
        }
    }
}

@POST('/login')
export class PostLoginRoute{
    execute (req: Request, res: Response) {
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
