module.exports = [
    class {
        constructor () {
            this.url = '/error/404';
            this.type = 'get';
        }
        execute (req, res) {
            res.send(JSON.stringify({'msg': '404 not found'}));
        }
    },

    class {
        constructor () {
            this.url = '/error/500';
            this.type = 'get';
        }
        execute (req, res) {
            res.send(JSON.stringify({'msg': '500 server error'}));
        }
    },
]