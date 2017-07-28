module.exports = class MainPage {
    constructor () {
        this.$ = require('../utils/dom');
        this.bird = new (require('../utils/bird'))();
        window.onload = () => {
            this.ready();
        }
    }
    ready () {
        
    }
}