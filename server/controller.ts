// const indexRoute = require('./router/index');
// const loginRoute = require('./router/login');
// const articleRoute = require('./router/article');
// const apiRoute = require('./router/api.js');
// const errorRoute = require('./router/article');

// module.exports = (router) => {
//     let routes = indexRoute.join(loginRoute)
//                            .join(articleRoute)
//                            .join(apiRoute)
//                            .join(errorRoute);
//     routes.map(Route => new Route())
//           .map(route => router[route.type](route.url, route.execute));
// }

export const GET = (url: string) => {
    return (constructor: Function) => {
        Object.defineProperty(constructor.prototype, 'url', {
            value: url
        });
        Object.defineProperty(constructor.prototype, 'type', {
            value: 'get'
        });
    }
}

export const POST = (url: string) => {
    return (constructor: Function) => {
        Object.defineProperty(constructor.prototype, 'url', {
            value: url
        });
        Object.defineProperty(constructor.prototype, 'type', {
            value: 'post'
        });
    }
}

export const DELETE = (url: string) => {
    return (constructor: Function) => {
        Object.defineProperty(constructor.prototype, 'url', {
            value: url
        });
        Object.defineProperty(constructor.prototype, 'type', {
            value: 'delete'
        });
    }
}

export const PATCH = (url: string) => {
    return (constructor: Function) => {
        Object.defineProperty(constructor.prototype, 'url', {
            value: url
        });
        Object.defineProperty(constructor.prototype, 'type', {
            value: 'patch'
        });
    }
}

export const PUT = (url: string) => {
    return (constructor: Function) => {
        Object.defineProperty(constructor.prototype, 'url', {
            value: url
        });
        Object.defineProperty(constructor.prototype, 'type', {
            value: 'put'
        });
    }
}