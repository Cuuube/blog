const config = require('./config.js');
const router = require('express').Router();
const Bird = require('../utils/bird.js');
const fomateDate = require('../utils/fomateDate.js');

exports.Router = class Router {
    constructor () {
        this.router = router;
        this.config = config;
        this.manageKey = config.manageKey;
        this.bird = new Bird(config.origin);
        this.fomateDate = fomateDate;
    }
    init() {

    }
    get(subrouter) {
        const url = subrouter.url;
        this.router.get(url, subrouter.exec());
    }
    post(subrouter) {
        const url = subrouter.url;
        this.router.post(url, subrouter.exec());
    }
    // 没用
    judgeManage (req) {
        return !!req.cookies.isManage
    }
}

// module.Controller = class Controller {
//     constructor () {
        
//     }
// }