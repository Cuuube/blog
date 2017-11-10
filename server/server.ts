import * as express from 'express';
import { Request, Response, NextFunction, Router } from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as nunjucks from 'nunjucks';

import config from './config';
import * as indexRoute from './router/index';
import * as loginRoute from './router/login';
import * as articleRoute from './router/article';
import * as apiRoute from './router/api';
import * as errorRoute from './router/error';
import { Route } from './controller';



export class Server {
    private config = config;
    private app = express();
    
    constructor () {
        this.init();
    }

    init (): Server {
        if (this.config.env === 'DEV') {
            this.app.use(express.static('./'));
        }

        return this.setStatic('./static')
            .setStatic('./public')
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
        this.mapObject(indexRoute, (route: Route) => {
            route.response(router);
        }).mapObject(loginRoute, (route: Route) => {
            route.response(router);
        }).mapObject(articleRoute, (route: Route) => {
            route.response(router);
        }).mapObject(apiRoute, (route: Route) => {
            route.response(router);
        }).mapObject(errorRoute, (route: Route) => {
            route.response(router);
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
        }).useMiddleware((err: obj, req: Request, res: Response) => {
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

    mapObject (RouteObjects: obj, callback: Function): Server {
        for (let key of Object.keys(RouteObjects)) {
            callback(new RouteObjects[key]());
        }

        return this;
    }

    run (port: number): Server {
        this.app.listen(port, (err: Error) => {
            if (err) throw new Error('Server error');
            console.log('Server started at: 🌐 http://localhost:' + port);
        })

        return this;
    }
}
