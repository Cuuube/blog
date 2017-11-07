const indexRoute = require('./router/index');
const loginRoute = require('./router/login');
const articleRoute = require('./router/article');
const apiRoute = require('./router/api.js');
const errorRoute = require('./router/article');

module.exports = (router) => {
    let routes = indexRoute.join(loginRoute)
                           .join(articleRoute)
                           .join(apiRoute)
                           .join(errorRoute);
    routes.map(Route => new Route())
          .map(route => router[route.type](route.url, route.execute));
}