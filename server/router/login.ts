import * as path from 'path';
import { Request, Response } from 'express';
import { GET, POST, Route } from '../controller';
import { Bird } from '../utils/bird';
import config from '../config';

const bird = new Bird(config.origin);
const { cookiesKeepTime, manageKey, origin } = config;


@GET('/login')
export class LoginPageRoute extends Route {
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
export class PostLoginRoute extends Route {
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
