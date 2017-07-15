module.exports = class Router {
    constructor (config) {
        this.url = config.url;
        this.config = config;
        this.dependence = config.dependence;
        this.router = require('express').Router();
    }
    bind (callback) {
        callback(this.router, this.dependence)
        return this;
    }
}