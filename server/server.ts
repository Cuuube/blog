import * as express from 'express';
import { Application, Express, Request, Response, NextFunction, Router } from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as nunjucks from 'nunjucks';

import config from './config';
import * as indexRoute from './router/index';
import * as loginRoute from './router/login';
import * as articleRoute from './router/article';
import * as apiRoute from './router/api';
import * as errorRoute from './router/error';



export class Server {
    private config = config;
    private app = express();
    
    constructor () {
        this.init();
    }

    init (): Server {
        return this.setStatic('./static')
            .useNunjucks()
            .useMiddleware(bodyParser.json())
            .useMiddleware(bodyParser.urlencoded({ extended: false }))
            .useMiddleware(cookieParser())
            .setRoute(this.app)
            .addError()
            .run(this.config.port);
    }

    setStatic (path: string): Server {
        this.app.use(express.static(path));
        return this;
    }

    setRoute (router: Router): Server {
        console.log(indexRoute);
        let routes = indexRoute.concat(loginRoute)
                               .concat(articleRoute)
                               .concat(apiRoute)
                               .concat(errorRoute);
        routes.map(Route => new Route())
              .map(route => {
                  router[route.type](route.url, route.execute)
              });
        
        return this;
    }

    useMiddleware (middleware: any): Server {
        this.app.use(middleware);
        return this;
    }

    useNunjucks (): Server {
        nunjucks.configure('./server/templates', {
            autoescape: false,
            express: this.app
        });
        this.app.set('views engine', 'html');
        return this;
    }

    addError (): Server {
        this.useMiddleware((req: Request, res: Response, next: NextFunction) => {
            const error: obj = new Error(` "${ req.originalUrl }" Not Found`);
            error.status = 404;
            next(error);
        });
        this.useMiddleware((err: obj, req: Request, res: Response) => {
            const status = err.status || 500;
            console.log(status);
            switch (status) {
                case 404:
                    res.redirect('/error/404');
                    break;
                default:
                    res.redirect('/error/500');
            }
        });
        return this;
    }

    run (port: number): Server {
        this.app.listen(port,(err: Error) => {
            if (err) throw new Error('Server error');
            console.log('Server started at : http://localhost:'+port);
        })
        return this;
    }
}
