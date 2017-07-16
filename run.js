const Server = require('./server/server.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = require('./server/config.js').port;

new Server({
})
.setStatic('./static')
.doOther((app) => {
    require('nunjucks').configure('./server/templates', {
        autoescape: false,
        express: app
    });
    app.set('views engine', 'html');
})
.useMiddleware(bodyParser.json())
.useMiddleware(bodyParser.urlencoded({ extended: false }))
.useMiddleware(cookieParser())
.setRoute(require('./server/router/index.js'))
.setRoute(require('./server/router/api.js'))
.setRoute(require('./server/router/login.js'))
.setRoute(require('./server/router/article.js'))
.setRoute(require('./server/router/error.js'))
.addError()
.run(port);