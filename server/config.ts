import * as process from 'process';

class Config {
    public protocol = 'http:';
    public hostname = '0.0.0.0';
    public port = 8888;
    public host = this.hostname + ':' + this.port;        // 0.0.0.0:8888
    public origin = this.protocol + '//' + this.host;     // http://0.0.0.0:8888
    public dbPath = 'mongodb://localhost/blog';
    public cookiesKeepTime = 12 * 60 * 60 * 1000;
    public manageKey = process.env['MANAGE_KEY'];
}

export default new Config();