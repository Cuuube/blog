module.exports = class Router {
    constructor (url) {
        this.url = url;
        this.router = require('express').Router();
    }
    bind (callback) {
        callback(this.router)
        return this;
    }
}