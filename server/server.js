module.exports = class CreatServer {
    constructor (config) {
        this.config = config;
        this.express = require('express');
        this.app = this.express();
    }
    setStatic (path) {
        this.app.use(this.express.static(path));
        return this;
    }
    setRoute (route) {
        let app = this.app;
        app.use(route.url, route.router);
        return this;
    }
    useMiddleware (middleware) {
        this.app.use(middleware);
        return this;
    }
    doOther (callback) {
        callback(this.app);
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
