let Server = require('./server/server.js');
let bodyParser = require('body-parser');

new Server({
})
.setStatic('./server/public')
.useMiddleware(bodyParser.json())
.useMiddleware(bodyParser.urlencoded({ extended: false }))
.setRoute(require('./server/router/index.js'))
.setRoute(require('./server/router/article.js'))
.setRoute(require('./server/router/error.js'))
.addError()
.run(9875);