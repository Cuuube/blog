module.exports = new(class {
    constructor() {
        this.protocol = 'http:';
        this.hostname = '0.0.0.0';
        this.port = 9875;
        this.host = this.hostname + ':' + this.port;        // 0.0.0.0:9875
        this.origin = this.protocol + '//' + this.host;     // http://0.0.0.0:9875
        this.dbPath = 'mongodb://localhost/blog';
    }
})();