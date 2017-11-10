import * as path from 'path';
import { Request, Response } from 'express';

import { GET, Route } from '../controller';
import { fomateDate } from '../utils/fomateDate';
import { Bird } from '../utils/bird';
import config from '../config';
import md from '../utils/markdown';

const bird = new Bird(config.origin);
const manageKey = config.manageKey;


// 文章主页
@GET('/article')
export class ArticleIndexRoute extends Route {
    async execute (req: Request, res: Response) {
        const pagePath = path.join('../templates', 'article', 'index.html');
        const isManage = req.cookies.isManage === manageKey;
        
        try {
            const resp = await bird.get('/api/v1/article');

            if (resp.data.length === 0) {
                res.redirect('/error/404');
            } else {
                resp.data.forEach((val: any) => {
                    val.created_time = fomateDate(val.created_time);
                })
                res.render(pagePath, {
                    articleList: resp.data,
                    isManage: isManage
                });
            }
        } catch (err) {
            res.redirect('/error/500');
        }
    }
}

// 文章新建页
@GET('/article/write')
export class ArticleWriteRoute extends Route {
    execute (req: Request, res: Response) {
        if (req.cookies.isManage !== manageKey) {
            res.redirect('/error/404');
            return ;
        }

        const pagePath = path.join('../templates', 'article', 'write.html');
        res.render(pagePath);
    }
}

// 文章详细页
@GET('/article/:article_name')
export class ArticleDetailsRoute extends Route {
    async execute (req: Request, res: Response) {
        const article_name: string = req.params.article_name;
        const pagePath = path.join('../templates', 'article', 'article.html');
        
        try {
            const resp = await bird.get('/api/v1/article', {file_name: article_name});
            if (resp.data.length === 0) {
                res.redirect('/error/404');
            } else {
                // 查询结果返回一个数组，我们只需要第一个 
                resp.data[0].content = md(resp.data[0].content);
                resp.data[0].created_time = new Date(resp.data[0].created_time).toLocaleString();
                res.render(pagePath, resp.data[0]);
            }
        } catch (err) {
            res.redirect('/error/500');            
        }
    }
}


// 不安全的请求接口，请使用 delete /api/article
@GET('/article/delete/:id')
export class DeleteArticleRoute extends Route {
    async execute (req: Request, res: Response) {
        if (req.cookies.isManage !== manageKey) {
            res.redirect('/error/404');
            return ;
        }

        const id: string = req.params.id;
        try {
            await bird.delete('/api/v1/article', {_id: id});
            res.send('success');

        } catch (err) {
            res.redirect('/error/500');
        }
    }
}