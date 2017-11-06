const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const nunjucks = require('nunjucks');

const config = require('./config.js');
const indexRoute = require('./router/index.js');
const loginRoute = require('./router/login.js');
const articleRoute = require('./router/article');
const apiRoute = require('./router/api.js');
const errorRoute = require('./router/error.js');



module.exports = class Server {
    constructor () {
        this.config = config;
        this.app = express();

        this.init();
    }

    init () {
        
        
        return this.setStatic('./static')
            .useNunjucks()
            .useMiddleware(bodyParser.json())
            .useMiddleware(bodyParser.urlencoded({ extended: false }))
            .useMiddleware(cookieParser())
            .setRoute(this.app)
            .addError()
            .run(this.config.port);
    }

    setStatic (path) {
        this.app.use(express.static(path));
        return this;
    }

    setRoute (router) {
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

    useMiddleware (middleware) {
        this.app.use(middleware);
        return this;
    }

    useNunjucks () {
        nunjucks.configure('./server/templates', {
            autoescape: false,
            express: this.app
        });
        this.app.set('views engine', 'html');
        return this;
    }
    addError () {
        this.useMiddleware((req, res, next) => {
            const error = new Error(` "${ req.originalUrl }" Not Found`);
            error.status = 404;
            next(error);
        });
        this.useMiddleware((err, req, res) => {
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

    run (port) {
        this.app.listen(port,(err) => {
            if (err) throw new Error('Server error');
            console.log('Server started at : http://localhost:'+port);
        })
        return this;
    }
}
