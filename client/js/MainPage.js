module.exports = class MainPage {
    constructor () {
        this.$ = require('../utils/doom');
        this.bird = new (require('../utils/bird'))();
        window.onload = () => {
            this.ready();
        }
    }
    ready () {
        
    }
}