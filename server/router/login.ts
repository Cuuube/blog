import { Request, Response } from 'express';
import { GET, POST, Route } from '../controller';
import { Bird } from '../utils/bird';
import config from '../config';

const bird = new Bird(config.origin);
const { cookiesKeepTime, manageKey } = config;


@GET('/login')
export class LoginPageRoute extends Route {
    execute (req: Request, res: Response) {
        if (req.cookies.isManage === manageKey) {
            res.redirect('/article');
            return;
        }

        const pagePath = 'login.pug';
        res.render(pagePath, {
            env: config.env
        });
    }
}

@POST('/login')
export class PostLoginRoute extends Route {
    async execute (req: Request, res: Response) {
        try {
            const resp = await bird.post('/api/v1/login', req.body);
            if (resp.data.code === 1) {
                res.cookie('isManage', manageKey, {
                    maxAge: cookiesKeepTime
                }).send({code: 1, msg: '登录成功'});
            } else {
                res.send({code: 0, msg: '登录失败'});
            }
        } catch (err) {}
    }
}
