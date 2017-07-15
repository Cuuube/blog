module.exports = class Router {
    constructor (config) {
        this.url = config.url;
        this.config = config;
        this.dependencies = config.dependencies;
        this.router = require('express').Router();
    }
    bind (callback) {
        callback(this.router, this.dependencies);
        return this;
    }
}