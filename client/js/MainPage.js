module.exports = class MainPage {
    constructor () {
        this.$ = require('../utils/dom');
        this.getter = new (require('../utils/getter'))();
        window.onload = () => {
            this.ready();
        }
    }
    ready () {
        
    }
}